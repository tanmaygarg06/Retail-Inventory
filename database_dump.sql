--
-- PostgreSQL database dump
--

\restrict WGeatoYraR6qAa86qM0oBOVqSqiHY2BJIi3e8SzifXIuT3pTfKwh33wdhtcvyj8

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.suppliers VALUES (1, 'Apple India Distributors', 'Tim Cook', 'supply@apple.in', '1800-111-222', 'Bangalore', NULL, NULL);
INSERT INTO public.suppliers VALUES (2, 'Sony Electronics Pvt Ltd', 'Kenichiro Yoshida', 'sales@sony.co.in', '1800-333-444', 'Gurugram', NULL, NULL);
INSERT INTO public.suppliers VALUES (3, 'Samsung Electronics', 'Han Jong-hee', 'b2b@samsung.com', '1800-555-666', 'Noida', NULL, NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.users VALUES (8, 'Ram', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'Ram@gmail.com', 'ACTIVE', '2026-09-29 11:40:13.219687', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (12, 'Rishi', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'tanmayg@gmail.com', 'ACTIVE', '2026-10-01 11:42:29.942805', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (11, 'TanmayGarg', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'gargtanmay644@gmail.com', 'ACTIVE', '2026-10-01 11:12:59.228374', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (9, 'tanmay', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'tanmaygemacc@gmail.com', 'ACTIVE', '2026-10-01 11:06:26.243426', NULL, NULL, 'Tanmay', '', 'Ghaziabad');
INSERT INTO public.users VALUES (13, 'Rishi Raj', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'RishiRaj@gmail.com', 'ACTIVE', '2026-10-01 13:47:18.43181', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (7, 'Tanmay Garg', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'tanmaylkgarg_customer@gmail.com', 'ACTIVE', '2026-09-29 11:24:42.358771', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (3, 'tanmay_garg06', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'tanmaylkgarg@gmail.com', 'ACTIVE', '2026-09-28 16:13:38.585507', '2026-09-29 15:46:11.537717', NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (14, 'Tanmay1', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'tanmaygarg@gmail.com', 'ACTIVE', '2026-10-30 07:24:52.003521', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (1, 'admin', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'admin@retailos.com', 'ACTIVE', '2026-09-28 08:59:20.413046', '2026-09-28 08:59:20.413046', NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (6, 'test_customer', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'test@test.com', 'ACTIVE', '2026-09-29 11:23:27.368656', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (4, 'Tanmay', '$2b$10$GV1PI7r6fnRZPMe5XZDsiOxTDz97JDFMk9i45GrMBlyG.z9TKH8My', 'gargtanmay65@gmail.com', 'ACTIVE', '2026-09-28 19:53:26.394149', '2026-09-28 19:53:26.394149', NULL, 'Tanmay Garg', NULL, 'Govind Puram');


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.categories VALUES (1, 'Electronics', 'Laptops, Smartphones, and Gadgets', '2026-09-30 01:52:39.757514');
INSERT INTO public.categories VALUES (2, 'Home & Decor', 'Furniture, Lighting, and Home Goods', '2026-09-30 01:52:39.757514');
INSERT INTO public.categories VALUES (3, 'Fashion', 'Apparel, Shoes, and Accessories', '2026-09-30 01:52:39.757514');
INSERT INTO public.categories VALUES (4, 'Beauty', 'Skincare, Makeup, and Fragrances', '2026-09-30 01:52:39.757514');
INSERT INTO public.categories VALUES (5, 'Sports', 'Fitness gear, Outdoor equipment', '2026-09-30 01:52:39.757514');
INSERT INTO public.categories VALUES (6, 'Accessories', 'Headphones, Smartwatches', '2026-09-30 01:52:39.757514');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.products VALUES (102, 'ELEC-IP15PM', 'iPhone 15 Pro Max', 1, 'Titanium 512GB', 120000.00, 159900.00, 20, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400');
INSERT INTO public.products VALUES (103, 'ELEC-S24U', 'Samsung Galaxy S24 Ultra', 1, '512GB, Titanium Gray', 100000.00, 129900.00, 15, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400');
INSERT INTO public.products VALUES (104, 'ELEC-PS5', 'PlayStation 5 Disc Edition', 1, '825GB SSD, 1 Controller', 40000.00, 54990.00, 30, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400');
INSERT INTO public.products VALUES (105, 'ELEC-XBSX', 'Xbox Series X', 1, '1TB Custom NVMe SSD', 40000.00, 54990.00, 30, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=400');
INSERT INTO public.products VALUES (106, 'ELEC-IPADPRO', 'iPad Pro 12.9', 1, 'M2 Chip, 256GB, Wi-Fi', 80000.00, 112900.00, 15, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400');
INSERT INTO public.products VALUES (107, 'ELEC-DELLXPS', 'Dell XPS 15', 1, 'Intel Core i9, 32GB RAM', 180000.00, 229990.00, 10, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400');
INSERT INTO public.products VALUES (108, 'ELEC-LG-OLED', 'LG C3 65 OLED TV', 1, '4K Smart TV, 120Hz', 150000.00, 199990.00, 5, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400');
INSERT INTO public.products VALUES (201, 'HOME-SOFA-BL', 'Modern Velvet Sofa', 2, '3-Seater, Midnight Blue', 35000.00, 59999.00, 10, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400');
INSERT INTO public.products VALUES (202, 'HOME-LAMP-01', 'Nordic Floor Lamp', 2, 'Matte Black with Gold Accents', 4000.00, 8999.00, 20, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400');
INSERT INTO public.products VALUES (203, 'HOME-RUG-BO', 'Bohemian Area Rug', 2, '8x10 ft, Handwoven', 12000.00, 21999.00, 15, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=400');
INSERT INTO public.products VALUES (204, 'HOME-DESK-WO', 'Ergonomic Standing Desk', 2, 'Solid Wood Top, Motorized', 25000.00, 42999.00, 10, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=400');
INSERT INTO public.products VALUES (205, 'HOME-CHAIR-ER', 'ErgoPro Office Chair', 2, 'Breathable Mesh, Lumbar Support', 10000.00, 18999.00, 25, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400');
INSERT INTO public.products VALUES (206, 'HOME-VASE-CE', 'Ceramic Minimalist Vase', 2, 'Set of 3, White/Beige', 1500.00, 3499.00, 40, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=400');
INSERT INTO public.products VALUES (207, 'HOME-BED-QU', 'Queen Size Bed Frame', 2, 'Upholstered Headboard, Grey', 28000.00, 49999.00, 8, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400');
INSERT INTO public.products VALUES (208, 'HOME-MIRROR', 'Round Wall Mirror', 2, '36 Gold Frame', 3500.00, 7999.00, 20, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=400');
INSERT INTO public.products VALUES (301, 'FASH-JKT-LE', 'Classic Leather Jacket', 3, '100% Genuine Leather, Black', 8000.00, 14999.00, 15, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400');
INSERT INTO public.products VALUES (302, 'FASH-SNK-WH', 'Minimalist White Sneakers', 3, 'Premium Leather, Unisex', 3000.00, 5999.00, 50, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400');
INSERT INTO public.products VALUES (303, 'FASH-BAG-TO', 'Canvas Tote Bag', 3, 'Water-resistant, Vegan Leather Trim', 1200.00, 2999.00, 60, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400');
INSERT INTO public.products VALUES (304, 'FASH-WCH-SL', 'Silver Chronograph Watch', 3, 'Stainless Steel, Sapphire Glass', 12000.00, 24999.00, 20, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=400');
INSERT INTO public.products VALUES (305, 'FASH-SUN-RB', 'Aviator Sunglasses', 3, 'Polarized Lenses, Gold Frame', 4000.00, 8999.00, 30, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400');
INSERT INTO public.products VALUES (306, 'FASH-BLT-LE', 'Reversible Leather Belt', 3, 'Black/Brown, Italian Leather', 1500.00, 3499.00, 40, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400');
INSERT INTO public.products VALUES (401, 'BEAU-SRM-VC', 'Vitamin C Glow Serum', 4, '30ml, 15% L-Ascorbic Acid', 800.00, 1999.00, 100, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400');
INSERT INTO public.products VALUES (402, 'BEAU-MSR-HY', 'Hydrating Moisturizer', 4, 'With Hyaluronic Acid & Ceramides', 600.00, 1499.00, 100, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400');
INSERT INTO public.products VALUES (403, 'BEAU-FRG-RO', 'Rose Oud Eau de Parfum', 4, '50ml, Long-lasting', 2500.00, 5999.00, 30, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400');
INSERT INTO public.products VALUES (404, 'BEAU-CLN-GM', 'Gentle Foaming Cleanser', 4, 'Sulfate-free, 150ml', 400.00, 999.00, 150, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400');
INSERT INTO public.products VALUES (405, 'BEAU-MSK-CL', 'Purifying Clay Mask', 4, 'Kaolin & Bentonite Clay', 500.00, 1299.00, 80, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1571781526291-857731773634?q=80&w=400');
INSERT INTO public.products VALUES (501, 'SPRT-MAT-YO', 'Eco-Friendly Yoga Mat', 5, '6mm Extra Thick, Non-slip', 800.00, 1999.00, 80, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1601122661559-693a2014b2d5?q=80&w=400');
INSERT INTO public.products VALUES (502, 'SPRT-DMB-10', 'Adjustable Dumbbell Set', 5, 'Up to 20kg, Cast Iron', 3500.00, 6999.00, 25, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1638043685090-343d8389eb37?q=80&w=400');
INSERT INTO public.products VALUES (503, 'SPRT-TND-PR', 'Pro Tennis Racket', 5, 'Graphite Frame, 300g', 8000.00, 14999.00, 15, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1622279457486-640c4cb4ab70?q=80&w=400');
INSERT INTO public.products VALUES (504, 'SPRT-BTL-ST', 'Stainless Steel Water Bottle', 5, '1L, Double-wall Vacuum Insulated', 600.00, 1499.00, 120, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400');
INSERT INTO public.products VALUES (601, 'ACC-AIR-P2', 'AirPods Pro 2', 6, 'Active Noise Cancellation', 18000.00, 24900.00, 40, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400');
INSERT INTO public.products VALUES (602, 'ACC-AW-S9', 'Apple Watch Series 9', 6, 'GPS + Cellular, 45mm', 35000.00, 44900.00, 30, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=400');
INSERT INTO public.products VALUES (603, 'ACC-SONY-XM5', 'Sony WH-1000XM5', 6, 'Over-Ear Wireless Headphones', 22000.00, 29990.00, 25, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400');
INSERT INTO public.products VALUES (605, 'ACC-PWB-20', '20000mAh Power Bank', 6, '65W Fast Charging', 2000.00, 4999.00, 100, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=400');
INSERT INTO public.products VALUES (101, 'ELEC-MBP16', 'MacBook Pro 16', 1, 'M3 Max, 64GB RAM, 2TB SSD', 250000.00, 159950.00, 10, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400');
INSERT INTO public.products VALUES (604, 'ACC-LOGI-MX', 'Logitech MX Master 3S', 6, 'Wireless Performance Mouse', 6000.00, 9995.00, 50, 'ACTIVE', '2026-09-30 01:52:39.76426', '2026-09-30 01:52:39.76426', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400');


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.warehouses VALUES (1, 'Delhi Central Hub', 'New Delhi, India', NULL, 50000, NULL, 'ACTIVE', NULL);
INSERT INTO public.warehouses VALUES (2, 'Mumbai Port Hub', 'Mumbai, India', NULL, 80000, NULL, 'ACTIVE', NULL);
INSERT INTO public.warehouses VALUES (3, 'Kolkata Hub', 'Kolkata', 'Default City', 50000, 'Rishi', 'ACTIVE', NULL);


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.inventory VALUES (1107, 107, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1202, 202, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1207, 207, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1302, 302, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1402, 402, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1502, 502, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1602, 602, 1, 200, 45, 155, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1108, 108, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1203, 203, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1208, 208, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1303, 303, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1403, 403, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1503, 503, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1603, 603, 1, 40, 38, 2, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1104, 104, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1204, 204, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1304, 304, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1404, 404, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1105, 105, 1, 150, 25, 125, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1205, 205, 1, 150, 25, 125, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1305, 305, 1, 150, 25, 125, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1405, 405, 1, 150, 25, 125, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1605, 605, 1, 150, 25, 125, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1101, 101, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1106, 106, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1201, 201, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1206, 206, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1301, 301, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1306, 306, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1401, 401, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1501, 501, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1601, 601, 1, 80, 12, 68, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1504, 504, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1604, 604, 1, 12, 12, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1103, 103, 1, 40, 40, 0, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1102, 102, 1, 200, 49, 151, '2026-09-30 01:52:39.774361');
INSERT INTO public.inventory VALUES (1606, 104, 2, 690000, 1, 689999, NULL);


--
-- Data for Name: inventory_transactions; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.notifications VALUES (1, 'ALERT', 'System reboot scheduled for midnight.', false, '2026-09-28 19:52:52.383234', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (2, 'ALERT', 'System reboot scheduled for midnight.', false, '2026-09-28 19:52:56.751943', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (3, 'ALERT', 'System reboot scheduled for midnight.', false, '2026-09-29 14:30:23.877149', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (4, 'ALERT', 'System reboot scheduled for midnight.', false, '2026-09-29 14:30:24.772338', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (5, 'GENERAL', 'Test alert!', true, '2026-09-29 15:48:00.481262', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (6, 'GENERAL', '📦 Order #PO-9943 has been successfully placed and is pending fulfillment.', true, '2026-09-29 15:54:46.778765', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (7, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-29 15:54:51.625395', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (8, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-29 15:54:52.522566', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (9, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-29 15:54:52.916047', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (10, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-29 15:54:53.071167', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (11, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-29 15:54:53.299217', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (12, 'GENERAL', '📦 Order #PO-9943 has been successfully placed and is pending fulfillment.', false, '2026-09-30 07:27:46.920758', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (13, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-30 07:27:48.702975', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (14, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-30 07:27:50.905991', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (15, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-30 07:27:51.155332', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (16, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-30 07:27:51.269032', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (17, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', false, '2026-09-30 07:27:51.478743', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (19, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', true, '2026-09-30 07:27:51.881511', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (18, 'GENERAL', '🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!', true, '2026-09-30 07:27:51.67392', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (20, 'GENERAL', 'dY" FLASH SALE: MacBook Pro 16 now has a 50% discount! Grab it before stock runs out!', false, '2026-09-30 08:10:17.169406', 6, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (22, 'GENERAL', 'dY" FLASH SALE: MacBook Pro 16 now has a 50% discount! Grab it before stock runs out!', false, '2026-09-30 08:10:17.337175', 7, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (21, 'GENERAL', 'dY" FLASH SALE: MacBook Pro 16 now has a 50% discount! Grab it before stock runs out!', true, '2026-09-30 08:10:17.277314', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.notifications VALUES (23, 'INFO', 'Your order has been successfully placed.', false, '2026-09-30 09:30:27.895718', 4, 'Order Placed', 'LOW', 'Order', 14, '/orders/14');
INSERT INTO public.notifications VALUES (24, 'INFO', 'Your order has been successfully placed.', false, '2026-10-01 11:08:02.968755', 9, 'Order Placed', 'LOW', 'Order', 15, '/orders/15');
INSERT INTO public.notifications VALUES (25, 'INFO', 'Your order has been successfully placed.', true, '2026-10-01 11:43:06.40111', 12, 'Order Placed', 'LOW', 'Order', 16, '/orders/16');
INSERT INTO public.notifications VALUES (26, 'INFO', 'Your order has been successfully placed.', false, '2026-10-01 14:26:53.658257', 13, 'Order Placed', 'LOW', 'Order', 17, '/orders/17');
INSERT INTO public.notifications VALUES (27, 'INFO', 'Your order has been successfully placed.', false, '2026-10-30 07:25:30.148159', 14, 'Order Placed', 'LOW', 'Order', 18, '/orders/18');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.orders VALUES (1, NULL, NULL, '2026-09-29 06:01:12.174', 'DELIVERED', 54990.00, 7);
INSERT INTO public.orders VALUES (2, NULL, NULL, '2026-09-29 06:04:08.919', 'DELIVERED', 159900.00, 4);
INSERT INTO public.orders VALUES (3, NULL, NULL, '2026-09-29 06:23:34.43', 'DELIVERED', 349900.00, 4);
INSERT INTO public.orders VALUES (10, NULL, NULL, '2026-09-29 09:49:51.005', 'DELIVERED', 519600.00, 6);
INSERT INTO public.orders VALUES (11, NULL, NULL, '2026-09-29 09:55:06.186', 'DELIVERED', 319800.00, 4);
INSERT INTO public.orders VALUES (12, NULL, NULL, '2026-09-29 09:58:07.79', 'DELIVERED', 54990.00, 4);
INSERT INTO public.orders VALUES (13, NULL, NULL, '2026-09-29 10:02:04.584', 'DELIVERED', 349900.00, 4);
INSERT INTO public.orders VALUES (8, NULL, NULL, '2026-10-10 00:00:00', 'DELIVERED', 1500.00, 6);
INSERT INTO public.orders VALUES (9, NULL, NULL, '2026-09-29 09:49:20.705', 'DELIVERED', 49800.00, 6);
INSERT INTO public.orders VALUES (14, NULL, NULL, '2026-09-30 04:00:27.609', 'DELIVERED', 159900.00, 4);
INSERT INTO public.orders VALUES (15, NULL, NULL, '2026-10-01 05:38:02.758', 'DELIVERED', 319800.00, 9);
INSERT INTO public.orders VALUES (16, NULL, NULL, '2026-10-01 06:13:06.236', 'DELIVERED', 259800.00, 12);
INSERT INTO public.orders VALUES (17, NULL, NULL, '2026-10-01 08:56:53.376', 'CANCELLED', 159900.00, 13);
INSERT INTO public.orders VALUES (18, NULL, NULL, '2026-10-30 01:55:30.023', 'DELIVERED', 184890.00, 14);


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.order_items VALUES (11, 14, 102, 1, 159900.00, 159900.00);
INSERT INTO public.order_items VALUES (12, 15, 102, 2, 159900.00, 319800.00);
INSERT INTO public.order_items VALUES (13, 16, 103, 2, 129900.00, 259800.00);
INSERT INTO public.order_items VALUES (14, 17, 102, 1, 159900.00, 159900.00);
INSERT INTO public.order_items VALUES (15, 18, 103, 1, 129900.00, 129900.00);
INSERT INTO public.order_items VALUES (16, 18, 104, 1, 54990.00, 54990.00);


--
-- Data for Name: purchase_orders; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.purchase_orders VALUES (1, NULL, '2026-09-29 08:16:05.508', 'PENDING_RECEIPT', 15000.00, NULL, NULL, NULL);
INSERT INTO public.purchase_orders VALUES (2, NULL, '2026-09-29 08:16:09.204', 'PENDING_RECEIPT', 15000.00, NULL, NULL, NULL);
INSERT INTO public.purchase_orders VALUES (3, NULL, '2026-09-29 08:16:10.633', 'PENDING_RECEIPT', 15000.00, NULL, NULL, NULL);
INSERT INTO public.purchase_orders VALUES (4, 1, '2026-09-30 02:40:42.352', 'RECEIVED', 20000.00, NULL, NULL, NULL);
INSERT INTO public.purchase_orders VALUES (5, 2, '2026-09-30 04:28:23.366', 'RECEIVED', 56000.00, NULL, NULL, NULL);


--
-- Data for Name: purchase_order_items; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.roles VALUES (1, 'ROLE_ADMIN');
INSERT INTO public.roles VALUES (2, 'ROLE_USER');
INSERT INTO public.roles VALUES (3, 'ROLE_CUSTOMER');
INSERT INTO public.roles VALUES (4, 'ROLE_SUPPLIER');
INSERT INTO public.roles VALUES (6, 'ROLE_INVENTORY_MANAGER');
INSERT INTO public.roles VALUES (7, 'ROLE_WAREHOUSE_MANAGER');
INSERT INTO public.roles VALUES (8, 'ROLE_PROCUREMENT_MANAGER');
INSERT INTO public.roles VALUES (9, 'ROLE_ORDER_MANAGER');


--
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: stock_transfers; Type: TABLE DATA; Schema: public; Owner: rism_user
--



--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: rism_user
--

INSERT INTO public.user_roles VALUES (1, 1);
INSERT INTO public.user_roles VALUES (3, 1);
INSERT INTO public.user_roles VALUES (4, 3);
INSERT INTO public.user_roles VALUES (6, 2);
INSERT INTO public.user_roles VALUES (6, 3);
INSERT INTO public.user_roles VALUES (7, 2);
INSERT INTO public.user_roles VALUES (7, 3);
INSERT INTO public.user_roles VALUES (8, 2);
INSERT INTO public.user_roles VALUES (7, 4);
INSERT INTO public.user_roles VALUES (8, 4);
INSERT INTO public.user_roles VALUES (9, 2);
INSERT INTO public.user_roles VALUES (9, 3);
INSERT INTO public.user_roles VALUES (11, 2);
INSERT INTO public.user_roles VALUES (11, 4);
INSERT INTO public.user_roles VALUES (12, 2);
INSERT INTO public.user_roles VALUES (12, 3);
INSERT INTO public.user_roles VALUES (13, 2);
INSERT INTO public.user_roles VALUES (13, 3);
INSERT INTO public.user_roles VALUES (14, 2);
INSERT INTO public.user_roles VALUES (14, 3);


--
-- Name: audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.audit_logs_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.inventory_id_seq', 1606, true);


--
-- Name: inventory_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.inventory_transactions_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.notifications_id_seq', 27, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.order_items_id_seq', 16, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.orders_id_seq', 18, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.products_id_seq', 605, true);


--
-- Name: purchase_order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.purchase_order_items_id_seq', 1, false);


--
-- Name: purchase_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.purchase_orders_id_seq', 5, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.roles_id_seq', 9, true);


--
-- Name: shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.shipments_id_seq', 1, false);


--
-- Name: stock_transfers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.stock_transfers_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rism_user
--

SELECT pg_catalog.setval('public.warehouses_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

\unrestrict WGeatoYraR6qAa86qM0oBOVqSqiHY2BJIi3e8SzifXIuT3pTfKwh33wdhtcvyj8

