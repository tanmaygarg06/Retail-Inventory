package com.hcl.inventory.controller;

import com.hcl.inventory.entity.Order;
import com.hcl.inventory.service.OrderService;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", service.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Order res = service.findById(id);
        if(res != null) return ResponseEntity.ok(new ApiResponse<>(true, "Fetched successfully", res));
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Order entity) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Created successfully", service.save(entity)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Order entity) {
        entity.setId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated successfully", service.save(entity)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
        Order order = service.findById(id);
        if (order != null) {
            order.setStatus(request.get("status"));
            return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", service.save(order)));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Deleted successfully", null));
    }
}
