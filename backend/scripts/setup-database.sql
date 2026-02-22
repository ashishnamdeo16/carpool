-- Run this as MySQL root to set up the database
-- Usage: mysql -u root -p < scripts/setup-database.sql

CREATE DATABASE IF NOT EXISTS statecarpool
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'statecarpooldb'@'localhost' IDENTIFIED BY 'ashish123';

GRANT ALL PRIVILEGES ON statecarpool.* TO 'statecarpooldb'@'localhost';

FLUSH PRIVILEGES;
