package com.hcl.inventory.service;

import com.hcl.inventory.entity.Inventory;
import com.hcl.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository repository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private com.hcl.inventory.repository.UserRepository userRepository;

    public List<Inventory> findAll() { return repository.findAll(); }
    public Inventory findById(Long id) { return repository.findById(id).orElse(null); }
    
    public Inventory save(Inventory entity) { 
        Inventory saved = repository.save(entity);
        
        // Low Stock Alert
        if (saved.getProduct() != null && saved.getProduct().getReorderLevel() != null) {
            List<Inventory> inventories = repository.findByProductId(saved.getProduct().getId());
            int totalAvailable = inventories.stream().mapToInt(i -> i.getAvailableQuantity() != null ? i.getAvailableQuantity() : 0).sum();
            
            if (totalAvailable < saved.getProduct().getReorderLevel()) {
                List<com.hcl.inventory.entity.User> managers = userRepository.findByRoleName("INVENTORY_MANAGER");
                for (com.hcl.inventory.entity.User u : managers) {
                    notificationService.createNotification(u.getId(), "Low Stock Alert", "LOW STOCK ALERT: " + saved.getProduct().getName() + " has dropped below reorder level (" + totalAvailable + " remaining).", "ALERT", "CRITICAL", "Inventory", saved.getProduct().getId(), "/inventory/" + saved.getProduct().getId());
                }
            }
        }
        
        return saved; 
    }
    
    public void deleteById(Long id) { repository.deleteById(id); }
}
