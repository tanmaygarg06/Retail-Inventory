package com.hcl.inventory.controller;

import com.hcl.inventory.entity.Category;
import com.hcl.inventory.service.CategoryService;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", service.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Category res = service.findById(id);
        if(res != null) return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", res));
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Category entity) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Created successfully", service.save(entity)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Category entity) {
        entity.setId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated successfully", service.save(entity)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Deleted successfully", null));
    }
}
