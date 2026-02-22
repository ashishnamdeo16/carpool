-- 50 dummy records per table
-- Password for all: password123 (BCrypt hash)

-- 47 additional users (we already have 3 from V2, total 50)
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('user4@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'David', 'Brown', '+1555111111'),
('user5@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Emma', 'Davis', '+1555222222'),
('user6@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Frank', 'Miller', '+1555333333'),
('user7@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Grace', 'Wilson', '+1555444444'),
('user8@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Henry', 'Moore', '+1555555555'),
('user9@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ivy', 'Taylor', '+1555666666'),
('user10@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jack', 'Anderson', '+1555777777'),
('user11@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Kate', 'Thomas', '+1555888888'),
('user12@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Leo', 'Jackson', '+1555999999'),
('user13@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Mia', 'White', '+1555000001'),
('user14@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Noah', 'Harris', '+1555000002'),
('user15@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Olivia', 'Martin', '+1555000003'),
('user16@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Paul', 'Thompson', '+1555000004'),
('user17@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Quinn', 'Garcia', '+1555000005'),
('user18@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Rachel', 'Martinez', '+1555000006'),
('user19@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sam', 'Robinson', '+1555000007'),
('user20@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Tina', 'Clark', '+1555000008'),
('user21@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Uma', 'Rodriguez', '+1555000009'),
('user22@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Victor', 'Lewis', '+1555000010'),
('user23@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Wendy', 'Lee', '+1555000011'),
('user24@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Xavier', 'Walker', '+1555000012'),
('user25@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Yara', 'Hall', '+1555000013'),
('user26@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Zane', 'Allen', '+1555000014'),
('user27@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Amy', 'Young', '+1555000015'),
('user28@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ben', 'King', '+1555000016'),
('user29@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Chloe', 'Wright', '+1555000017'),
('user30@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Drew', 'Scott', '+1555000018'),
('user31@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Eva', 'Green', '+1555000019'),
('user32@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Finn', 'Adams', '+1555000020'),
('user33@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Gina', 'Nelson', '+1555000021'),
('user34@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Hugo', 'Hill', '+1555000022'),
('user35@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Iris', 'Campbell', '+1555000023'),
('user36@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jake', 'Mitchell', '+1555000024'),
('user37@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Kara', 'Roberts', '+1555000025'),
('user38@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Liam', 'Turner', '+1555000026'),
('user39@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Nina', 'Phillips', '+1555000027'),
('user40@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Owen', 'Evans', '+1555000028'),
('user41@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Paula', 'Parker', '+1555000029'),
('user42@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ryan', 'Edwards', '+1555000030'),
('user43@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sara', 'Collins', '+1555000031'),
('user44@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Tom', 'Stewart', '+1555000032'),
('user45@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ursula', 'Sanchez', '+1555000033'),
('user46@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Vince', 'Morris', '+1555000034'),
('user47@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Willow', 'Rogers', '+1555000035'),
('user48@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Xander', 'Reed', '+1555000036'),
('user49@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Yuki', 'Cook', '+1555000037'),
('user50@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Zara', 'Morgan', '+1555000038');

-- 47 additional rides (we have 3, total 50) - using users 1-25 as drivers in rotation
INSERT INTO rides (driver_id, origin, destination, departure_time, available_seats, total_seats, price_per_seat, description, car_model, car_plate, status) VALUES
(2, 'Chicago', 'Detroit', DATE_ADD(NOW(), INTERVAL 1 DAY), 2, 4, 35.00, 'Smooth ride', 'Ford Fusion', 'IL-1111', 'ACTIVE'),
(3, 'Seattle', 'Portland', DATE_ADD(NOW(), INTERVAL 2 DAY), 1, 3, 40.00, 'Coastal highway', 'Subaru Outback', 'WA-2222', 'ACTIVE'),
(4, 'Denver', 'Salt Lake City', DATE_ADD(NOW(), INTERVAL 3 DAY), 3, 4, 55.00, 'Mountain views', 'Jeep Cherokee', 'CO-3333', 'ACTIVE'),
(5, 'Austin', 'Houston', DATE_ADD(NOW(), INTERVAL 4 DAY), 2, 3, 25.00, 'Texas road trip', 'Chevy Malibu', 'TX-4444', 'ACTIVE'),
(6, 'Miami', 'Orlando', DATE_ADD(NOW(), INTERVAL 5 DAY), 2, 2, 30.00, 'Beach to theme parks', 'Kia Optima', 'FL-5555', 'ACTIVE'),
(7, 'Phoenix', 'Tucson', DATE_ADD(NOW(), INTERVAL 6 DAY), 1, 2, 20.00, 'Desert drive', 'Hyundai Sonata', 'AZ-6666', 'ACTIVE'),
(8, 'Philadelphia', 'Washington DC', DATE_ADD(NOW(), INTERVAL 7 DAY), 3, 4, 28.00, 'East coast corridor', 'Nissan Altima', 'PA-7777', 'ACTIVE'),
(9, 'Dallas', 'San Antonio', DATE_ADD(NOW(), INTERVAL 8 DAY), 2, 3, 22.00, 'Lone star route', 'Mazda 6', 'TX-8888', 'ACTIVE'),
(10, 'Atlanta', 'Nashville', DATE_ADD(NOW(), INTERVAL 9 DAY), 1, 2, 45.00, 'Music cities', 'VW Passat', 'GA-9999', 'ACTIVE'),
(1, 'Minneapolis', 'Chicago', DATE_ADD(NOW(), INTERVAL 10 DAY), 3, 4, 50.00, 'Midwest express', 'Toyota Prius', 'MN-1010', 'ACTIVE'),
(2, 'Las Vegas', 'Los Angeles', DATE_ADD(NOW(), INTERVAL 11 DAY), 2, 3, 60.00, 'Vegas to LA', 'BMW 330i', 'NV-1111', 'ACTIVE'),
(3, 'Charlotte', 'Raleigh', DATE_ADD(NOW(), INTERVAL 12 DAY), 2, 2, 18.00, 'NC cities', 'Audi A4', 'NC-1212', 'ACTIVE'),
(4, 'Indianapolis', 'Cincinnati', DATE_ADD(NOW(), INTERVAL 13 DAY), 3, 4, 28.00, 'Midwest loop', 'Lexus ES', 'IN-1313', 'ACTIVE'),
(5, 'Columbus', 'Pittsburgh', DATE_ADD(NOW(), INTERVAL 14 DAY), 2, 3, 32.00, 'Ohio to PA', 'Acura TLX', 'OH-1414', 'ACTIVE'),
(6, 'Milwaukee', 'Madison', DATE_ADD(NOW(), INTERVAL 15 DAY), 1, 2, 15.00, 'Wisconsin trip', 'Infiniti Q50', 'WI-1515', 'ACTIVE'),
(7, 'Baltimore', 'Richmond', DATE_ADD(NOW(), INTERVAL 16 DAY), 2, 4, 35.00, 'Chesapeake area', 'Genesis G80', 'MD-1616', 'ACTIVE'),
(8, 'San Diego', 'Phoenix', DATE_ADD(NOW(), INTERVAL 17 DAY), 3, 4, 55.00, 'Southwest tour', 'Tesla Model Y', 'CA-1717', 'ACTIVE'),
(9, 'Tampa', 'Jacksonville', DATE_ADD(NOW(), INTERVAL 18 DAY), 2, 3, 38.00, 'Florida coast', 'Volvo S60', 'FL-1818', 'ACTIVE'),
(10, 'Kansas City', 'St Louis', DATE_ADD(NOW(), INTERVAL 19 DAY), 1, 2, 25.00, 'Heartland drive', 'Cadillac CT5', 'MO-1919', 'ACTIVE'),
(11, 'New Orleans', 'Houston', DATE_ADD(NOW(), INTERVAL 20 DAY), 3, 4, 48.00, 'Gulf coast', 'Buick Regal', 'LA-2020', 'ACTIVE'),
(12, 'Oklahoma City', 'Dallas', DATE_ADD(NOW(), INTERVAL 21 DAY), 2, 3, 30.00, 'Great plains', 'Chrysler 300', 'OK-2121', 'ACTIVE'),
(13, 'Memphis', 'Nashville', DATE_ADD(NOW(), INTERVAL 22 DAY), 2, 2, 22.00, 'Tennessee tour', 'Lincoln MKZ', 'TN-2222', 'ACTIVE'),
(14, 'Louisville', 'Indianapolis', DATE_ADD(NOW(), INTERVAL 23 DAY), 1, 3, 20.00, 'Derby route', 'Alfa Romeo Giulia', 'KY-2323', 'ACTIVE'),
(15, 'Raleigh', 'Wilmington', DATE_ADD(NOW(), INTERVAL 24 DAY), 3, 4, 28.00, 'NC coast', 'Jaguar XE', 'NC-2424', 'ACTIVE'),
(16, 'Hartford', 'Boston', DATE_ADD(NOW(), INTERVAL 25 DAY), 2, 3, 22.00, 'New England', 'Mercedes C300', 'CT-2525', 'ACTIVE'),
(17, 'Albuquerque', 'El Paso', DATE_ADD(NOW(), INTERVAL 26 DAY), 2, 2, 42.00, 'Southwest', 'Porsche Panamera', 'NM-2626', 'ACTIVE'),
(18, 'Omaha', 'Denver', DATE_ADD(NOW(), INTERVAL 27 DAY), 1, 4, 65.00, 'Plains to mountains', 'Land Rover Discovery', 'NE-2727', 'ACTIVE'),
(19, 'Boise', 'Salt Lake City', DATE_ADD(NOW(), INTERVAL 28 DAY), 2, 3, 55.00, 'Mountain states', 'Range Rover Sport', 'ID-2828', 'ACTIVE'),
(20, 'Spokane', 'Seattle', DATE_ADD(NOW(), INTERVAL 29 DAY), 3, 4, 40.00, 'Pacific NW', 'Maserati Ghibli', 'WA-2929', 'ACTIVE'),
(1, 'Sacramento', 'San Francisco', DATE_ADD(NOW(), INTERVAL 30 DAY), 2, 3, 28.00, 'Bay area', 'Bentley Flying Spur', 'CA-3030', 'ACTIVE'),
(2, 'Fresno', 'Los Angeles', DATE_ADD(NOW(), INTERVAL 31 DAY), 1, 2, 35.00, 'Central CA', 'Rolls Royce Ghost', 'CA-3131', 'ACTIVE'),
(3, 'Tucson', 'Phoenix', DATE_ADD(NOW(), INTERVAL 32 DAY), 2, 4, 18.00, 'Arizona shuttle', 'Ferrari Roma', 'AZ-3232', 'ACTIVE'),
(4, 'El Paso', 'Albuquerque', DATE_ADD(NOW(), INTERVAL 33 DAY), 3, 4, 45.00, 'Rio Grande', 'Lamborghini Huracan', 'TX-3333', 'ACTIVE'),
(5, 'Jackson', 'Memphis', DATE_ADD(NOW(), INTERVAL 34 DAY), 2, 2, 38.00, 'Mississippi', 'McLaren 720S', 'MS-3434', 'ACTIVE'),
(6, 'Little Rock', 'Dallas', DATE_ADD(NOW(), INTERVAL 35 DAY), 1, 3, 42.00, 'Arkansas to Texas', 'Aston Martin DB11', 'AR-3535', 'ACTIVE'),
(7, 'Birmingham', 'Atlanta', DATE_ADD(NOW(), INTERVAL 36 DAY), 2, 4, 32.00, 'Deep south', 'Bentley Continental', 'AL-3636', 'ACTIVE'),
(8, 'Knoxville', 'Charlotte', DATE_ADD(NOW(), INTERVAL 37 DAY), 2, 3, 35.00, 'Appalachian', 'Maserati Quattroporte', 'TN-3737', 'ACTIVE'),
(9, 'Lexington', 'Cincinnati', DATE_ADD(NOW(), INTERVAL 38 DAY), 1, 2, 25.00, 'Bluegrass', 'Alfa Romeo Stelvio', 'KY-3838', 'ACTIVE'),
(10, 'Des Moines', 'Chicago', DATE_ADD(NOW(), INTERVAL 39 DAY), 3, 4, 48.00, 'Iowa to Illinois', 'Volvo XC90', 'IA-3939', 'ACTIVE'),
(11, 'Wichita', 'Kansas City', DATE_ADD(NOW(), INTERVAL 40 DAY), 2, 3, 28.00, 'Kansas corridor', 'Lexus RX', 'KS-4040', 'ACTIVE'),
(12, 'Colorado Springs', 'Denver', DATE_ADD(NOW(), INTERVAL 41 DAY), 2, 2, 22.00, 'Front range', 'Audi Q7', 'CO-4141', 'ACTIVE'),
(13, 'Albuquerque', 'Santa Fe', DATE_ADD(NOW(), INTERVAL 42 DAY), 1, 3, 25.00, 'Land of enchantment', 'BMW X5', 'NM-4242', 'ACTIVE'),
(14, 'Salt Lake City', 'Las Vegas', DATE_ADD(NOW(), INTERVAL 43 DAY), 3, 4, 58.00, 'Desert express', 'Mercedes GLE', 'UT-4343', 'ACTIVE'),
(15, 'Portland', 'Eugene', DATE_ADD(NOW(), INTERVAL 44 DAY), 2, 3, 20.00, 'Oregon trail', 'Tesla Model X', 'OR-4444', 'ACTIVE'),
(16, 'Eugene', 'Seattle', DATE_ADD(NOW(), INTERVAL 45 DAY), 2, 2, 75.00, 'Pacific coast', 'Porsche Cayenne', 'OR-4545', 'ACTIVE'),
(17, 'Anchorage', 'Fairbanks', DATE_ADD(NOW(), INTERVAL 46 DAY), 1, 3, 120.00, 'Alaska adventure', 'Toyota 4Runner', 'AK-4646', 'ACTIVE'),
(18, 'Honolulu', 'Hilo', DATE_ADD(NOW(), INTERVAL 47 DAY), 2, 4, 85.00, 'Island hopping', 'Jeep Wrangler', 'HI-4747', 'ACTIVE'),
(19, 'Burlington', 'Montreal', DATE_ADD(NOW(), INTERVAL 48 DAY), 2, 3, 45.00, 'North country', 'Subaru Crosstrek', 'VT-4848', 'ACTIVE'),
(20, 'Portland', 'Vancouver BC', DATE_ADD(NOW(), INTERVAL 49 DAY), 1, 2, 65.00, 'Pacific NW to Canada', 'Honda CR-V', 'OR-4949', 'ACTIVE');

-- 50 bookings: riders request seats on various rides (rider != driver)
INSERT INTO bookings (ride_id, rider_id, requested_seats, status, message) VALUES
(1, 4, 1, 'ACCEPTED', 'Looking forward to the ride'),
(1, 5, 2, 'PENDING', 'Need 2 seats please'),
(2, 6, 1, 'ACCEPTED', NULL),
(3, 7, 2, 'REJECTED', NULL),
(4, 8, 1, 'ACCEPTED', 'Thanks!'),
(5, 9, 1, 'PENDING', NULL),
(6, 10, 1, 'ACCEPTED', 'First time rider'),
(7, 11, 2, 'ACCEPTED', 'Me and my friend'),
(8, 12, 1, 'PENDING', NULL),
(9, 13, 2, 'REJECTED', NULL),
(10, 14, 1, 'ACCEPTED', 'See you there'),
(11, 15, 1, 'PENDING', NULL),
(12, 16, 2, 'ACCEPTED', NULL),
(13, 17, 1, 'ACCEPTED', 'Thanks in advance'),
(14, 18, 1, 'CANCELLED', NULL),
(15, 19, 2, 'ACCEPTED', NULL),
(16, 20, 1, 'PENDING', NULL),
(17, 21, 1, 'ACCEPTED', 'Perfect timing'),
(18, 22, 2, 'ACCEPTED', NULL),
(19, 23, 1, 'REJECTED', NULL),
(20, 24, 1, 'ACCEPTED', NULL),
(21, 25, 2, 'PENDING', NULL),
(22, 26, 1, 'ACCEPTED', 'Can pick up anywhere'),
(23, 27, 1, 'ACCEPTED', NULL),
(24, 28, 2, 'ACCEPTED', NULL),
(25, 29, 1, 'PENDING', NULL),
(26, 30, 1, 'ACCEPTED', 'Early pickup ok'),
(27, 31, 2, 'ACCEPTED', NULL),
(28, 32, 1, 'REJECTED', NULL),
(29, 33, 1, 'ACCEPTED', NULL),
(30, 34, 2, 'ACCEPTED', 'Two passengers'),
(31, 35, 1, 'PENDING', NULL),
(32, 36, 1, 'ACCEPTED', NULL),
(33, 37, 2, 'ACCEPTED', NULL),
(34, 38, 1, 'ACCEPTED', 'Flexible on time'),
(35, 39, 1, 'PENDING', NULL),
(36, 40, 2, 'ACCEPTED', NULL),
(37, 41, 1, 'ACCEPTED', NULL),
(38, 42, 1, 'REJECTED', NULL),
(39, 43, 2, 'ACCEPTED', 'Family trip'),
(40, 44, 1, 'ACCEPTED', NULL),
(41, 45, 1, 'PENDING', NULL),
(42, 46, 2, 'ACCEPTED', NULL),
(43, 47, 1, 'ACCEPTED', 'Thanks!'),
(44, 48, 1, 'ACCEPTED', NULL),
(45, 49, 2, 'PENDING', NULL),
(46, 50, 1, 'ACCEPTED', NULL),
(47, 1, 1, 'ACCEPTED', 'Different user as rider'),
(48, 2, 2, 'ACCEPTED', NULL),
(49, 3, 1, 'ACCEPTED', NULL),
(50, 4, 1, 'PENDING', NULL);

-- Update available_seats for rides with ACCEPTED bookings
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 1;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 2;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 4;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 6;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 7;
-- Ride 8: only PENDING booking, no deduction
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 10;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 12;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 13;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 15;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 17;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 18;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 20;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 22;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 23;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 24;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 26;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 27;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 29;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 30;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 32;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 33;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 34;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 36;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 37;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 39;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 40;
UPDATE rides SET available_seats = available_seats - 2 WHERE id = 42;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 43;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 44;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 46;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 47;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 48;
UPDATE rides SET available_seats = available_seats - 1 WHERE id = 49;

-- 50 ratings: from_user rates to_user after ACCEPTED ride (rider<->driver pairs)
-- Format: (ride_id, from_user_id, to_user_id) where from and to shared the ride
INSERT INTO ratings (ride_id, from_user_id, to_user_id, score, comment) VALUES
(1, 4, 1, 5, 'Great driver!'),
(1, 1, 4, 5, 'Good passenger'),
(2, 6, 1, 4, 'Smooth ride'),
(2, 1, 6, 4, NULL),
(4, 8, 2, 5, 'Excellent'),
(4, 2, 8, 5, 'Pleasant'),
(6, 10, 4, 4, NULL),
(6, 4, 10, 4, 'Nice traveler'),
(7, 11, 5, 5, 'Very comfortable'),
(7, 5, 11, 5, NULL),
(10, 14, 8, 5, 'Would ride again'),
(10, 8, 14, 4, 'Friendly rider'),
(12, 16, 10, 4, 'Good driver'),
(12, 10, 16, 5, 'On time'),
(13, 17, 4, 5, NULL),
(13, 4, 17, 4, NULL),
(15, 19, 3, 4, 'Nice car'),
(15, 3, 19, 5, 'Good companion'),
(17, 21, 5, 5, 'Perfect'),
(17, 5, 21, 4, 'Polite'),
(18, 22, 6, 4, 'On time'),
(18, 6, 22, 5, NULL),
(20, 24, 8, 5, 'Friendly'),
(20, 8, 24, 4, NULL),
(22, 26, 10, 4, NULL),
(22, 10, 26, 5, NULL),
(23, 27, 1, 5, 'Clean vehicle'),
(23, 1, 27, 4, NULL),
(24, 28, 2, 4, 'Good trip'),
(24, 2, 28, 5, NULL),
(26, 30, 4, 5, 'Recommend'),
(26, 4, 30, 4, NULL),
(27, 31, 5, 4, NULL),
(27, 5, 31, 5, NULL),
(29, 33, 7, 5, 'Smooth'),
(29, 7, 33, 4, NULL),
(30, 34, 8, 4, 'Safe driver'),
(30, 8, 34, 5, NULL),
(32, 36, 10, 5, NULL),
(32, 10, 36, 4, NULL),
(33, 37, 11, 4, 'Comfortable'),
(33, 11, 37, 5, NULL),
(34, 38, 12, 5, 'Great experience'),
(34, 12, 38, 4, NULL),
(36, 40, 14, 4, NULL),
(36, 14, 40, 5, NULL),
(37, 41, 15, 5, 'Excellent driver'),
(37, 15, 41, 4, NULL),
(39, 43, 17, 4, 'Would recommend'),
(39, 17, 43, 5, NULL),
(40, 44, 18, 5, NULL),
(40, 18, 44, 4, NULL),
(42, 46, 20, 4, 'Good ride'),
(42, 20, 46, 5, NULL),
(43, 47, 1, 5, 'Very nice'),
(43, 1, 47, 4, NULL),
(44, 48, 2, 4, NULL),
(44, 2, 48, 5, NULL),
(46, 50, 4, 5, 'Top notch'),
(46, 4, 50, 4, NULL),
(47, 1, 5, 4, 'Driver was great'),
(47, 5, 1, 5, NULL),
(48, 2, 6, 5, NULL),
(48, 6, 2, 4, NULL),
(49, 3, 7, 4, 'Smooth journey'),
(49, 7, 3, 5, NULL);
