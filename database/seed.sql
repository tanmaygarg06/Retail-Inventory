-- Insert admin role
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON CONFLICT DO NOTHING;

-- Insert admin user (password is 'password123' bcrypt hashed)
INSERT INTO users (username, password, email, status) 
VALUES ('admin', '$2a$10$sX8g2E6rG/T/M8k292Z.0ee6n/T8q4b8uJ6u5P3vB3/96b9n4kR/S', 'admin@retailos.com', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- Assign role to user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r 
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;
