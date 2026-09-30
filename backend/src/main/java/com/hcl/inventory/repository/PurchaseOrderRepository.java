package com.hcl.inventory.repository;

import com.hcl.inventory.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    java.util.List<PurchaseOrder> findBySupplierId(Long supplierId);
}
