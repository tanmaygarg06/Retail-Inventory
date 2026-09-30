package com.hcl.inventory.service;

import com.hcl.inventory.entity.StockTransfer;
import com.hcl.inventory.repository.StockTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StockTransferService {
    @Autowired
    private StockTransferRepository repository;

    public List<StockTransfer> findAll() { return repository.findAll(); }
    public StockTransfer findById(Long id) { return repository.findById(id).orElse(null); }
    public StockTransfer save(StockTransfer entity) { return repository.save(entity); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
