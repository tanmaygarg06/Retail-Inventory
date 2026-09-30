package com.hcl.inventory.controller;

import com.hcl.inventory.entity.PurchaseOrder;
import com.hcl.inventory.entity.PurchaseOrderItem;
import com.hcl.inventory.service.PurchaseOrderService;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.hcl.inventory.entity.User;
import com.hcl.inventory.repository.UserRepository;

@RestController
@RequestMapping("/api/supplier")
public class SupplierPortalController {

    @Autowired
    private PurchaseOrderService purchaseOrderService;
    @Autowired
    private UserRepository userRepository;

    // a) Get their own Purchase Orders
    @GetMapping("/purchaseorders")
    public ResponseEntity<?> getPurchaseOrders(@RequestParam(required = false) Long supplierId, @RequestParam(required = false) Long userId) {
        if (userId != null) { User u = userRepository.findById(userId).orElse(null); if (u != null && u.getSupplier() != null) supplierId = u.getSupplier().getId(); } List<PurchaseOrder> pos = purchaseOrderService.findBySupplierId(supplierId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Purchase Orders fetched", pos));
    }

    // b) Accept/Reject a PO
    @PostMapping("/purchaseorders/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status"); // ACCEPTED or REJECTED or PREPARING or READY_TO_SHIP or SHIPPED
        PurchaseOrder po = purchaseOrderService.findById(id);
        if (po == null) {
            return ResponseEntity.notFound().build();
        }
        po.setStatus(status);
        PurchaseOrder updated = purchaseOrderService.save(po);
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", updated));
    }

    // c) Update shipment quantities for PO items
    @PutMapping("/purchaseorders/{id}/items")
    public ResponseEntity<?> updateShipmentQuantities(@PathVariable Long id, @RequestBody List<Map<String, Object>> itemsPayload) {
        PurchaseOrder po = purchaseOrderService.findById(id);
        if (po == null) {
            return ResponseEntity.notFound().build();
        }
        
        for (Map<String, Object> itemPayload : itemsPayload) {
            Long itemId = Long.valueOf(itemPayload.get("itemId").toString());
            Integer shippedQuantity = itemPayload.get("shippedQuantity") != null ? Integer.valueOf(itemPayload.get("shippedQuantity").toString()) : null;
            Integer acceptedQuantity = itemPayload.get("acceptedQuantity") != null ? Integer.valueOf(itemPayload.get("acceptedQuantity").toString()) : null;

            for (PurchaseOrderItem item : po.getItems()) {
                if (item.getId().equals(itemId)) {
                    if (shippedQuantity != null) item.setShippedQuantity(shippedQuantity);
                    if (acceptedQuantity != null) item.setAcceptedQuantity(acceptedQuantity);
                    break;
                }
            }
        }
        
        PurchaseOrder updated = purchaseOrderService.save(po);
        return ResponseEntity.ok(new ApiResponse<>(true, "Shipment quantities updated", updated));
    }
}

