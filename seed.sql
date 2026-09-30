DELETE FROM order_items;
DELETE FROM inventory;
DELETE FROM products;
DELETE FROM categories;

INSERT INTO categories (id, name, description, created_at) VALUES 
(1, 'Electronics', 'Laptops, Smartphones, and Gadgets', NOW()),
(2, 'Home & Decor', 'Furniture, Lighting, and Home Goods', NOW()),
(3, 'Fashion', 'Apparel, Shoes, and Accessories', NOW()),
(4, 'Beauty', 'Skincare, Makeup, and Fragrances', NOW()),
(5, 'Sports', 'Fitness gear, Outdoor equipment', NOW()),
(6, 'Accessories', 'Headphones, Smartwatches', NOW());

INSERT INTO products (id, sku, name, description, cost_price, selling_price, reorder_level, status, category_id, image_url, created_at, updated_at) VALUES
(101, 'ELEC-MBP16', 'MacBook Pro 16', 'M3 Max, 64GB RAM, 2TB SSD', 250000.00, 319900.00, 10, 'ACTIVE', 1, '/MacBook_Pro.jpg', NOW(), NOW()),
(102, 'ELEC-IP15PM', 'iPhone 15 Pro Max', 'Titanium 512GB', 120000.00, 159900.00, 20, 'ACTIVE', 1, '/IPhone_15_Pro.jpg', NOW(), NOW()),
(103, 'ELEC-S24U', 'Samsung Galaxy S24 Ultra', '512GB, Titanium Gray', 100000.00, 129900.00, 15, 'ACTIVE', 1, '/Samsung_Galaxy_S24.jpg', NOW(), NOW()),
(104, 'ELEC-PS5', 'PlayStation 5 Disc Edition', '825GB SSD, 1 Controller', 40000.00, 54990.00, 30, 'ACTIVE', 1, '/PlayStation_5.jpg', NOW(), NOW()),
(105, 'ELEC-XBSX', 'Xbox Series X', '1TB Custom NVMe SSD', 40000.00, 54990.00, 30, 'ACTIVE', 1, '/placeholder.jpg', NOW(), NOW()),
(106, 'ELEC-IPADPRO', 'iPad Pro 12.9', 'M2 Chip, 256GB, Wi-Fi', 80000.00, 112900.00, 15, 'ACTIVE', 1, '/IPad_Pro.jpg', NOW(), NOW()),
(107, 'ELEC-DELLXPS', 'Dell XPS 15', 'Intel Core i9, 32GB RAM', 180000.00, 229990.00, 10, 'ACTIVE', 1, '/Dell_XPS.jpg', NOW(), NOW()),
(108, 'ELEC-LG-OLED', 'LG C3 65 OLED TV', '4K Smart TV, 120Hz', 150000.00, 199990.00, 5, 'ACTIVE', 1, '/placeholder.jpg', NOW(), NOW()),
(201, 'HOME-SOFA-BL', 'Modern Velvet Sofa', '3-Seater, Midnight Blue', 35000.00, 59999.00, 10, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(202, 'HOME-LAMP-01', 'Nordic Floor Lamp', 'Matte Black with Gold Accents', 4000.00, 8999.00, 20, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(203, 'HOME-RUG-BO', 'Bohemian Area Rug', '8x10 ft, Handwoven', 12000.00, 21999.00, 15, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(204, 'HOME-DESK-WO', 'Ergonomic Standing Desk', 'Solid Wood Top, Motorized', 25000.00, 42999.00, 10, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(205, 'HOME-CHAIR-ER', 'ErgoPro Office Chair', 'Breathable Mesh, Lumbar Support', 10000.00, 18999.00, 25, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(206, 'HOME-VASE-CE', 'Ceramic Minimalist Vase', 'Set of 3, White/Beige', 1500.00, 3499.00, 40, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(207, 'HOME-BED-QU', 'Queen Size Bed Frame', 'Upholstered Headboard, Grey', 28000.00, 49999.00, 8, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(208, 'HOME-MIRROR', 'Round Wall Mirror', '36 Gold Frame', 3500.00, 7999.00, 20, 'ACTIVE', 2, '/placeholder.jpg', NOW(), NOW()),
(301, 'FASH-JKT-LE', 'Classic Leather Jacket', '100% Genuine Leather, Black', 8000.00, 14999.00, 15, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(302, 'FASH-SNK-WH', 'Minimalist White Sneakers', 'Premium Leather, Unisex', 3000.00, 5999.00, 50, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(303, 'FASH-BAG-TO', 'Canvas Tote Bag', 'Water-resistant, Vegan Leather Trim', 1200.00, 2999.00, 60, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(304, 'FASH-WCH-SL', 'Silver Chronograph Watch', 'Stainless Steel, Sapphire Glass', 12000.00, 24999.00, 20, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(305, 'FASH-SUN-RB', 'Aviator Sunglasses', 'Polarized Lenses, Gold Frame', 4000.00, 8999.00, 30, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(306, 'FASH-BLT-LE', 'Reversible Leather Belt', 'Black/Brown, Italian Leather', 1500.00, 3499.00, 40, 'ACTIVE', 3, '/placeholder.jpg', NOW(), NOW()),
(401, 'BEAU-SRM-VC', 'Vitamin C Glow Serum', '30ml, 15% L-Ascorbic Acid', 800.00, 1999.00, 100, 'ACTIVE', 4, '/placeholder.jpg', NOW(), NOW()),
(402, 'BEAU-MSR-HY', 'Hydrating Moisturizer', 'With Hyaluronic Acid & Ceramides', 600.00, 1499.00, 100, 'ACTIVE', 4, '/placeholder.jpg', NOW(), NOW()),
(403, 'BEAU-FRG-RO', 'Rose Oud Eau de Parfum', '50ml, Long-lasting', 2500.00, 5999.00, 30, 'ACTIVE', 4, '/placeholder.jpg', NOW(), NOW()),
(404, 'BEAU-CLN-GM', 'Gentle Foaming Cleanser', 'Sulfate-free, 150ml', 400.00, 999.00, 150, 'ACTIVE', 4, '/placeholder.jpg', NOW(), NOW()),
(405, 'BEAU-MSK-CL', 'Purifying Clay Mask', 'Kaolin & Bentonite Clay', 500.00, 1299.00, 80, 'ACTIVE', 4, '/placeholder.jpg', NOW(), NOW()),
(501, 'SPRT-MAT-YO', 'Eco-Friendly Yoga Mat', '6mm Extra Thick, Non-slip', 800.00, 1999.00, 80, 'ACTIVE', 5, '/placeholder.jpg', NOW(), NOW()),
(502, 'SPRT-DMB-10', 'Adjustable Dumbbell Set', 'Up to 20kg, Cast Iron', 3500.00, 6999.00, 25, 'ACTIVE', 5, '/placeholder.jpg', NOW(), NOW()),
(503, 'SPRT-TND-PR', 'Pro Tennis Racket', 'Graphite Frame, 300g', 8000.00, 14999.00, 15, 'ACTIVE', 5, '/placeholder.jpg', NOW(), NOW()),
(504, 'SPRT-BTL-ST', 'Stainless Steel Water Bottle', '1L, Double-wall Vacuum Insulated', 600.00, 1499.00, 120, 'ACTIVE', 5, '/placeholder.jpg', NOW(), NOW()),
(601, 'ACC-AIR-P2', 'AirPods Pro 2', 'Active Noise Cancellation', 18000.00, 24900.00, 40, 'ACTIVE', 6, '/AirPods_Pro.jpg', NOW(), NOW()),
(602, 'ACC-AW-S9', 'Apple Watch Series 9', 'GPS + Cellular, 45mm', 35000.00, 44900.00, 30, 'ACTIVE', 6, '/placeholder.jpg', NOW(), NOW()),
(603, 'ACC-SONY-XM5', 'Sony WH-1000XM5', 'Over-Ear Wireless Headphones', 22000.00, 29990.00, 25, 'ACTIVE', 6, '/Headphones.jpg', NOW(), NOW()),
(604, 'ACC-LOGI-MX', 'Logitech MX Master 3S', 'Wireless Performance Mouse', 6000.00, 9995.00, 50, 'ACTIVE', 6, '/placeholder.jpg', NOW(), NOW()),
(605, 'ACC-PWB-20', '20000mAh Power Bank', '65W Fast Charging', 2000.00, 4999.00, 100, 'ACTIVE', 6, '/placeholder.jpg', NOW(), NOW());

INSERT INTO inventory (id, product_id, warehouse_id, total_quantity, available_quantity, reserved_quantity, last_updated) 
SELECT id + 1000, id, 1, 50, 50, 0, NOW() FROM products WHERE id > 100;

SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('inventory_id_seq', (SELECT MAX(id) FROM inventory));
