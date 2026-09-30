package com.hcl.inventory.config;

import com.hcl.inventory.entity.*;
import com.hcl.inventory.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private SupplierRepository supplierRepository;
    @Autowired private WarehouseRepository warehouseRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if(true) return;
        // --- 1. SEED ROLES ---
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
            Role r = new Role(); r.setName("ROLE_ADMIN"); return roleRepository.save(r);
        });
        roleRepository.findByName("ROLE_USER").orElseGet(() -> {
            Role r = new Role(); r.setName("ROLE_USER"); return roleRepository.save(r);
        });

        // --- 2. SEED ADMIN USER ---
        User admin = userRepository.findByUsername("tanmay_garg06").orElse(new User());
        admin.setUsername("tanmay_garg06");
        admin.setEmail("tanmaylkgarg@gamil.com");
        admin.setPassword(passwordEncoder.encode("$Tanmay@06"));
        admin.setStatus("ACTIVE");
        if (admin.getId() == null) admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        admin.setRoles(roles);
        userRepository.save(admin);
        
        // --- 3. SEED WAREHOUSES ---
        if (warehouseRepository.count() == 0) {
            Warehouse w1 = new Warehouse(); w1.setName("Delhi Central Hub"); w1.setAddress("New Delhi, India"); w1.setCapacity(50000); w1.setStatus("ACTIVE");
            Warehouse w2 = new Warehouse(); w2.setName("Mumbai Port Hub"); w2.setAddress("Mumbai, India"); w2.setCapacity(80000); w2.setStatus("ACTIVE");
            warehouseRepository.saveAll(List.of(w1, w2));
        }

        // --- 4. SEED SUPPLIERS ---
        if (supplierRepository.count() == 0) {
            Supplier s1 = new Supplier(); s1.setSupplierName("Apple India Distributors"); s1.setContactPerson("Tim Cook"); s1.setEmail("supply@apple.in"); s1.setPhone("1800-111-222"); s1.setAddress("Bangalore");
            Supplier s2 = new Supplier(); s2.setSupplierName("Sony Electronics Pvt Ltd"); s2.setContactPerson("Kenichiro Yoshida"); s2.setEmail("sales@sony.co.in"); s2.setPhone("1800-333-444"); s2.setAddress("Gurugram");
            Supplier s3 = new Supplier(); s3.setSupplierName("Samsung Electronics"); s3.setContactPerson("Han Jong-hee"); s3.setEmail("b2b@samsung.com"); s3.setPhone("1800-555-666"); s3.setAddress("Noida");
            supplierRepository.saveAll(List.of(s1, s2, s3));
        }

        // --- 5. SEED 10 PRODUCTS & INVENTORY ---
        // FORCING UPDATE FOR REALISTIC PRICES
        // inventoryRepository.deleteAll(); // Reset inventory mapping
        // productRepository.deleteAll(); // Reset products
        
        Warehouse delhi = warehouseRepository.findAll().get(0);
        Warehouse mumbai = warehouseRepository.findAll().get(1);

        List<Product> products = new ArrayList<>();
            products.add(createProduct("MAC-PRO-M3", "MacBook Pro M3 Max", "Apple 16-inch Space Black", "349900.00", "300000.00", "/MacBook_Pro.jpg"));
            products.add(createProduct("IPH-15-PM", "iPhone 15 Pro Max", "Titanium 256GB", "159900.00", "130000.00", "/IPhone_15_Pro.jpg"));
            products.add(createProduct("SSG-S24-U", "Samsung Galaxy S24 Ultra", "Titanium Gray 512GB", "129900.00", "100000.00", "/Samsung_Galaxy_S24.jpg"));
            products.add(createProduct("SONY-WH-1000XM5", "Sony WH-1000XM5", "Noise Cancelling Headphones", "29990.00", "24000.00", "/Headphones.jpg"));
            products.add(createProduct("DELL-XPS-15", "Dell XPS 15", "OLED Touchscreen 1TB", "189900.00", "150000.00", "/Dell_XPS.jpg"));
            products.add(createProduct("IPAD-PRO-M4", "iPad Pro M4", "13-inch Space Black OLED", "99900.00", "80000.00", "/IPad_Pro.jpg"));
            products.add(createProduct("APP-AIRPODS-PRO", "AirPods Pro 2", "USB-C MagSafe Case", "24900.00", "18000.00", "/AirPods_Pro.jpg"));
            products.add(createProduct("SONY-PS5", "PlayStation 5 Slim", "1TB Console Disc Edition", "54990.00", "45000.00", "/PlayStation_5.jpg"));
            products.add(createProduct("NIN-SWITCH", "Nintendo Switch OLED", "Neon Red/Blue Joy-Con", "29990.00", "22000.00", "/Nintendo_Switch.jpg"));
            products.add(createProduct("XBOX-SX", "Xbox Series X", "1TB Console Black", "54990.00", "45000.00", "/Xbox_Series_X.jpg"));
            
            List<Product> savedProducts = productRepository.saveAll(products);
            
            // Seed Inventories
            List<Inventory> inventories = new ArrayList<>();
            for (Product p : savedProducts) {
                // Delhi Hub gets 100 units of everything
                Inventory i1 = new Inventory();
                i1.setProduct(p); i1.setWarehouse(delhi); i1.setTotalQuantity(100); i1.setAvailableQuantity(100); i1.setReservedQuantity(0);
                // Mumbai Hub gets 50 units of everything
                Inventory i2 = new Inventory();
                i2.setProduct(p); i2.setWarehouse(mumbai); i2.setTotalQuantity(50); i2.setAvailableQuantity(50); i2.setReservedQuantity(0);
                
                inventories.add(i1); inventories.add(i2);
            }
            inventoryRepository.saveAll(inventories);

        System.out.println("✅ ENTIRE DEMO DATABASE (10 Products, Suppliers, Warehouses, Inventory) SEEDED SUCCESSFULLY!");
    }

    private Product createProduct(String sku, String name, String desc, String sell, String cost, String img) {
        Product p = new Product();
        p.setSku(sku); p.setName(name); p.setDescription(desc);
        p.setSellingPrice(new BigDecimal(sell)); p.setCostPrice(new BigDecimal(cost));
        p.setImageUrl(img); p.setStatus("ACTIVE"); p.setReorderLevel(20);
        return p;
    }
}


