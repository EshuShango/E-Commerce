-- -- -- DROP DATABASE
-- -- DROP DATABASE IF EXISTS ecommerce_db;

-- -- -- CREATE DATABASE
-- -- CREATE DATABASE ecommerce_db;

-- USE ecommerce_db;

-- -- DROP TABLES
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS tags;
-- DROP TABLE IF EXISTS products_tags;

-- -- CREATE TABLES WITH FOREIGN KEYS AND CONSTRAINTS cascade
-- CREATE TABLE categories (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE products (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   price DECIMAL(10,2) NOT NULL,
--   stock INT NOT NULL DEFAULT 10,
--   category_id INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
-- );

-- CREATE TABLE tags (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE products_tags (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_id INT NOT NULL,
--   tag_id INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
--   FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
-- );