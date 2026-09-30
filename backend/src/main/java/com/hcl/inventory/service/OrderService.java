package com.hcl.inventory.service;

import com.hcl.inventory.entity.Order;
import com.hcl.inventory.entity.OrderItem;
import com.hcl.inventory.entity.Inventory;
import com.hcl.inventory.entity.Notification;
import com.hcl.inventory.entity.User;
import com.hcl.inventory.repository.OrderRepository;
import com.hcl.inventory.repository.InventoryRepository;
import com.hcl.inventory.repository.NotificationRepository;
import com.hcl.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired private OrderRepository repository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private UserRepository userRepository;

    public List<Order> findAll() { return repository.findAll(); }
    public Order findById(Long id) { return repository.findById(id).orElse(null); }
    
    private void notifyUser(Long userId, String title, String message, String type, String priority, String relatedModule, Long relatedId, String actionUrl) {
        notificationService.createNotification(userId, title, message, type, priority, relatedModule, relatedId, actionUrl);
    }

    @Transactional
    public Order save(Order entity) { 
        boolean isNew = (entity.getId() == null);
        String oldStatus = null;
        if (!isNew) {
            Order existing = repository.findById(entity.getId()).orElse(null);
            if (existing != null) oldStatus = existing.getStatus();
        }
        
        // Link bidirectional mapping
        if (entity.getItems() != null) {
            for (OrderItem item : entity.getItems()) {
                item.setOrder(entity);
                
                // Inventory Logic
                if (isNew && item.getProduct() != null && item.getQuantity() != null) {
                    List<Inventory> inventories = inventoryRepository.findByProductId(item.getProduct().getId());
                    int quantityToReserve = item.getQuantity();
                    int totalAvailable = 0;
                    
                    for (Inventory inv : inventories) {
                        int available = inv.getAvailableQuantity() != null ? inv.getAvailableQuantity() : 0;
                        int reserved = inv.getReservedQuantity() != null ? inv.getReservedQuantity() : 0;
                        
                        if (quantityToReserve > 0 && available > 0) {
                            int toDeduct = Math.min(available, quantityToReserve);
                            inv.setAvailableQuantity(available - toDeduct);
                            inv.setReservedQuantity(reserved + toDeduct);
                            quantityToReserve -= toDeduct;
                            inventoryRepository.save(inv);
                            available = inv.getAvailableQuantity();
                        }
                        totalAvailable += available;
                    }
                    
                    // Low Stock Alert
                    Integer reorderLevel = item.getProduct().getReorderLevel();
                    if (reorderLevel != null && totalAvailable < reorderLevel) {
                        List<User> managers = userRepository.findByRoleName("INVENTORY_MANAGER");
                        for (User manager : managers) {
                            notifyUser(manager.getId(), "Low Stock Alert", "LOW STOCK ALERT: " + item.getProduct().getName() + " has dropped below reorder level (" + totalAvailable + " remaining).", "ALERT", "CRITICAL", "Inventory", item.getProduct().getId(), "/inventory/" + item.getProduct().getId());
                        }
                    }
                }
            }
        }
        

        if (!isNew && oldStatus != null && !oldStatus.equals(entity.getStatus()) && ("SHIPPED".equalsIgnoreCase(entity.getStatus()) || "DELIVERED".equalsIgnoreCase(entity.getStatus()))) {
            if (entity.getItems() != null) {
                for (OrderItem item : entity.getItems()) {
                    if (item.getProduct() != null && item.getQuantity() != null) {
                        List<Inventory> inventories = inventoryRepository.findByProductId(item.getProduct().getId());
                        int quantityToDeduct = item.getQuantity();
                        for (Inventory inv : inventories) {
                            int reserved = inv.getReservedQuantity() != null ? inv.getReservedQuantity() : 0;
                            int total = inv.getTotalQuantity() != null ? inv.getTotalQuantity() : 0;
                            if (quantityToDeduct > 0 && reserved > 0) {
                                int deduct = Math.min(reserved, quantityToDeduct);
                                inv.setReservedQuantity(reserved - deduct);
                                inv.setTotalQuantity(total - deduct);
                                quantityToDeduct -= deduct;
                                inventoryRepository.save(inv);
                            }
                        }
                    }
                }
            }
        }
        Order saved = repository.save(entity);
        
        if (isNew) {
            if (saved.getCreatedBy() != null) {
                notifyUser(saved.getCreatedBy().getId(), "Order Placed", "Your order has been successfully placed.", "INFO", "LOW", "Order", saved.getId(), "/orders/" + saved.getId());
            }
            List<User> orderManagers = userRepository.findByRoleName("ORDER_MANAGER");
            for (User mgr : orderManagers) {
                notifyUser(mgr.getId(), "New Order", "New order placed for Rs. " + saved.getTotalAmount(), "INFO", "HIGH", "Order", saved.getId(), "/orders/" + saved.getId());
            }
        } else if (oldStatus != null && !oldStatus.equals(saved.getStatus()) && saved.getCreatedBy() != null) {
            notifyUser(saved.getCreatedBy().getId(), "Order Status Updated", "Your order status has been updated to " + saved.getStatus(), "INFO", "LOW", "Order", saved.getId(), "/orders/" + saved.getId());
        }
        
        return saved; 
    }
    
    public void deleteById(Long id) { repository.deleteById(id); }
}

