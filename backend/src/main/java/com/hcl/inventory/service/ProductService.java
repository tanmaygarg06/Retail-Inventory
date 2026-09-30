package com.hcl.inventory.service;

import com.hcl.inventory.entity.Product;
import com.hcl.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<Product> findAll() { return repository.findAll(); }
    public Product findById(Long id) { return repository.findById(id).orElse(null); }
    public Product save(Product entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
