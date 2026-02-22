-- Full reset: drop and recreate database, then let Flyway re-run all migrations
-- Run as root: mysql -u root -p < scripts/reset-and-seed.sql

DROP DATABASE IF EXISTS statecarpool;

CREATE DATABASE statecarpool
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
