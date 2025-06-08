Drop Database resto_connect;

CREATE Database resto_connect;

use resto_connect;

-- 1. Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    phone VARCHAR(15),
    role enum('admin', 'owner', 'customer') 
    
);

-- 2. Restaurants
CREATE TABLE restaurants (
    resto_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    name VARCHAR(100),
    document TEXT,
    location VARCHAR(100)
);

-- 3. Menu Items
CREATE TABLE menu_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    item_name VARCHAR(100),
    price DECIMAL(8,2),
    category VARCHAR(50)
);

-- 4. Restaurant Tables
CREATE TABLE restaurant_tables (
    table_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    capacity INT,
    charge DECIMAL(8,2),
    category enum('Gold', 'Silver', 'Premium')
);

-- 5. Reviews
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    customer_id INT,
    comment TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

-- 6. Bookings
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    resto_id INT,
    table_id INT,
    start_time DATETIME,
    end_time DATETIME,
    status enum('Booked', 'Cancelled', 'Completed')
);
-- 7. Orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    order_time DATETIME,
    status enum ('Pending', 'Confirmed', 'Delivered')
);

-- 8. Order Details
CREATE TABLE order_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    item_id INT,
    quantity INT
);

-- 9. Bills
CREATE TABLE bills (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    table_charge DECIMAL(8,2),
    items_total DECIMAL(8,2),
    total_amount DECIMAL(8,2),
    status enum('Unpaid', 'Paid')
);