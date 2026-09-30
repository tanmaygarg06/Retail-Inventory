package com.hcl.inventory.service;

import com.hcl.inventory.entity.Supplier;
import com.hcl.inventory.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository repository;

    public List<Supplier> findAll() { return repository.findAll(); }
    public Supplier findById(Long id) { return repository.findById(id).orElse(null); }
    public Supplier save(Supplier entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
