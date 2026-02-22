-- Seed data for demo
-- Password for all users: password123 (BCrypt hash)

INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('alice@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Alice', 'Johnson', '+1234567890'),
('bob@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Bob', 'Smith', '+1987654321'),
('carol@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Carol', 'Williams', '+1122334455');

-- Seed rides (driver_id 1 = Alice)
INSERT INTO rides (driver_id, origin, destination, departure_time, available_seats, total_seats, price_per_seat, description, car_model, car_plate, status) VALUES
(1, 'New York', 'Boston', DATE_ADD(NOW(), INTERVAL 2 DAY), 3, 4, 25.00, 'Comfortable ride, AC on', 'Toyota Camry', 'XYZ-1234', 'ACTIVE'),
(1, 'Boston', 'New York', DATE_ADD(NOW(), INTERVAL 5 DAY), 2, 2, 30.00, 'Direct route', 'Honda Accord', 'ABC-5678', 'ACTIVE'),
(2, 'San Francisco', 'Los Angeles', DATE_ADD(NOW(), INTERVAL 3 DAY), 2, 3, 45.00, 'Scenic coastal drive', 'Tesla Model 3', 'SF-9999', 'ACTIVE');
