
ALTER TABLE notifications ADD COLUMN title VARCHAR(255);
ALTER TABLE notifications ADD COLUMN priority VARCHAR(50);
ALTER TABLE notifications ADD COLUMN related_module VARCHAR(100);
ALTER TABLE notifications ADD COLUMN related_id BIGINT;
ALTER TABLE notifications ADD COLUMN action_url VARCHAR(255);

ALTER TABLE users ADD COLUMN supplier_id BIGINT REFERENCES suppliers(id);

ALTER TABLE purchase_orders ADD COLUMN expected_delivery_date TIMESTAMP;
ALTER TABLE purchase_orders ADD COLUMN delivery_warehouse_id BIGINT REFERENCES warehouses(id);

ALTER TABLE purchase_order_items ADD COLUMN accepted_quantity INTEGER DEFAULT 0;
ALTER TABLE purchase_order_items ADD COLUMN shipped_quantity INTEGER DEFAULT 0;
ALTER TABLE purchase_order_items ADD COLUMN received_quantity INTEGER DEFAULT 0;

INSERT INTO roles (name) VALUES ('ROLE_SUPPLIER'), ('ROLE_INVENTORY_MANAGER'), ('ROLE_WAREHOUSE_MANAGER'), ('ROLE_PROCUREMENT_MANAGER'), ('ROLE_ORDER_MANAGER') ON CONFLICT DO NOTHING;

