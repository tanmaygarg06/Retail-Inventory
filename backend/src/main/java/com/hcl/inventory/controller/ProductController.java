package com.hcl.inventory.controller;

import com.hcl.inventory.entity.Product;
import com.hcl.inventory.service.ProductService;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", service.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Product res = service.findById(id);
        if(res != null) return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", res));
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Product entity) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Created successfully", service.save(entity)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Product entity) {
        entity.setId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated successfully", service.save(entity)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Deleted successfully", null));
    }
}
