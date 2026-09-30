package com.hcl.inventory.service;

import com.hcl.inventory.entity.Warehouse;
import com.hcl.inventory.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository repository;

    public List<Warehouse> findAll() { return repository.findAll(); }
    public Warehouse findById(Long id) { return repository.findById(id).orElse(null); }
    public Warehouse save(Warehouse entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
