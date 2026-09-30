package com.hcl.inventory.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal totalAmount;
    private LocalDateTime expectedDeliveryDate;
    @ManyToOne
    @JoinColumn(name = "delivery_warehouse_id")
    private Warehouse deliveryWarehouse;
    
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
    private List<PurchaseOrderItem> items;
}
