
UPDATE inventory SET total_quantity = 150, reserved_quantity = 25, available_quantity = 125 WHERE id % 5 = 0;
UPDATE inventory SET total_quantity = 80, reserved_quantity = 12, available_quantity = 68 WHERE id % 5 = 1;
UPDATE inventory SET total_quantity = 200, reserved_quantity = 45, available_quantity = 155 WHERE id % 5 = 2;
UPDATE inventory SET total_quantity = 40, reserved_quantity = 38, available_quantity = 2 WHERE id % 5 = 3;
UPDATE inventory SET total_quantity = 12, reserved_quantity = 12, available_quantity = 0 WHERE id % 5 = 4;

