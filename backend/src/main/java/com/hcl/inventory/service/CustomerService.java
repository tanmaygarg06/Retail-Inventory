package com.hcl.inventory.service;

import com.hcl.inventory.entity.Customer;
import com.hcl.inventory.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository repository;

    public List<Customer> findAll() { return repository.findAll(); }
    public Customer findById(Long id) { return repository.findById(id).orElse(null); }
    public Customer save(Customer entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
