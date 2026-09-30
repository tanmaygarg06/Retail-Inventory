package com.hcl.inventory.controller;

import com.hcl.inventory.entity.Product;
import com.hcl.inventory.entity.Order;
import com.hcl.inventory.repository.ProductRepository;
import com.hcl.inventory.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/inventory/csv")
    public ResponseEntity<byte[]> getInventoryCsv() {
        List<Product> products = productRepository.findAll();
        StringBuilder csv = new StringBuilder("ID,SKU,Name,Category,Selling Price,Cost Price\n");
        for (Product p : products) {
            csv.append(p.getId()).append(",")
               .append(p.getSku()).append(",")
               .append(p.getName() != null ? p.getName().replace(",", " ") : "").append(",")
               .append(p.getCategory() != null ? p.getCategory().getName() : "").append(",")
               .append(p.getSellingPrice()).append(",")
               .append(p.getCostPrice()).append("\n");
        }
        
        byte[] bytes = csv.toString().getBytes();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"inventory_report.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
    
    @GetMapping("/sales/csv")
    public ResponseEntity<byte[]> getSalesCsv() {
        List<Order> orders = orderRepository.findAll();
        StringBuilder csv = new StringBuilder("Order ID,Date,Status,Total Amount\n");
        for (Order o : orders) {
            csv.append(o.getId()).append(",")
               .append(o.getOrderDate()).append(",")
               .append(o.getStatus()).append(",")
               .append(o.getTotalAmount()).append("\n");
        }
        
        byte[] bytes = csv.toString().getBytes();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"sales_report.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
}
