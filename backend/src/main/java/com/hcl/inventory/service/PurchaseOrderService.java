package com.hcl.inventory.service;

import com.hcl.inventory.entity.PurchaseOrder;
import com.hcl.inventory.entity.PurchaseOrderItem;
import com.hcl.inventory.entity.User;
import com.hcl.inventory.repository.PurchaseOrderRepository;
import com.hcl.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.hcl.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PurchaseOrderService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PurchaseOrderRepository repository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    public List<PurchaseOrder> findAll() { return repository.findAll(); }
    public PurchaseOrder findById(Long id) { return repository.findById(id).orElse(null); }
    
    @Transactional
    public PurchaseOrder save(PurchaseOrder entity) { 
        boolean isNew = (entity.getId() == null);
        String oldStatus = null;
        if (!isNew) {
            PurchaseOrder existing = repository.findById(entity.getId()).orElse(null);
            if (existing != null) oldStatus = existing.getStatus();
        }

        if (entity.getItems() != null) {
            for (PurchaseOrderItem item : entity.getItems()) {
                item.setPurchaseOrder(entity);
            }
        }
        
        PurchaseOrder saved = repository.save(entity);
        
        if (isNew) {
            // Notify Supplier
            if (saved.getSupplier() != null) {
                List<User> suppliers = userRepository.findBySupplierId(saved.getSupplier().getId());
                for (User u : suppliers) {
                    notificationService.createNotification(u.getId(), "New Purchase Order", "You have received a new Purchase Order #" + saved.getId(), "INFO", "HIGH", "PurchaseOrder", saved.getId(), "/supplier/purchase-orders/" + saved.getId());
                }
            }
        } else if (oldStatus != null && !oldStatus.equals(saved.getStatus())) {
            // If status changed to ACCEPTED, notify Procurement Manager
            if ("ACCEPTED".equals(saved.getStatus())) {
                List<User> procManagers = userRepository.findByRoleName("PROCUREMENT_MANAGER");
                for (User u : procManagers) {
                    notificationService.createNotification(u.getId(), "PO Accepted", "Purchase Order #" + saved.getId() + " has been accepted by the supplier.", "INFO", "HIGH", "PurchaseOrder", saved.getId(), "/procurement/purchase-orders/" + saved.getId());
                }
            }
        }
        
        return saved; 
    }
    
    public void deleteById(Long id) { repository.deleteById(id); }

    public List<PurchaseOrder> findBySupplierId(Long supplierId) {
        return repository.findBySupplierId(supplierId);
    }
}

