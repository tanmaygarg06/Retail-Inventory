package com.hcl.inventory.service;

import com.hcl.inventory.entity.InventoryTransaction;
import com.hcl.inventory.repository.InventoryTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventoryTransactionService {
    @Autowired
    private InventoryTransactionRepository repository;

    public List<InventoryTransaction> findAll() { return repository.findAll(); }
    public InventoryTransaction findById(Long id) { return repository.findById(id).orElse(null); }
    public InventoryTransaction save(InventoryTransaction entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
