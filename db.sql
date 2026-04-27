-- Database initialization script for the product demo
-- Run this file in MySQL before starting the app.

CREATE DATABASE IF NOT EXISTS my_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE my_app;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO products (name, category, price, stock, description) VALUES
('无线机械键盘', '外设', 399.00, 28, '支持三模连接，适合办公和游戏场景。'),
('4K 显示器', '显示设备', 1599.00, 12, '高色准面板，适合内容创作和日常开发。');
