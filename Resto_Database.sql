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

insert into users(user_id,name,email,password,phone,role)values
(1,'Aditya Kamble','adityakamble@gmail.com','a@123',1234,'Owner'),
(2,'Sojwal Magar','sojwalmagar@gmail.com','s@123',5678,'User'),
(3,'Madhura Vyavahare','madhura@gmail.com','m@123',6789,'Owner'),
(4,'Nishigandha Kolapkar','nishi@gmail.com','n@123',9876,'Owner');

insert into users(user_id,name,email,password,phone,role)values
(1,'Aditya Kamble','adityakamble@gmail.com',1234,'a@123','Owner'),
(2,'Sojwal Magar','sojwalmagar@gmail.com',5678,'s@123','Owner'),
(3,'Madhura Vyavahare','madhura@gmail.com',6789,'m@123','Owner'),
(4,'Nishigandha Kolapkar','nishi@gmail.com',7896,'n@123','Owner');

-- 2. Restaurants
CREATE TABLE restaurants (
    resto_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    name VARCHAR(100),
    document TEXT,
    location VARCHAR(100),
    is_blocked TINYINT(1) DEFAULT 0
    is_verify TINYINT(1) DEFAULT 0
);

insert into restaurants(resto_id,owner_id,name,document,location)values
(1,01,'Cafe Bliss','Aadhaar card','Nashik'),
(2,03,'Hotel Sai Sagar','Aadhaar card','Pune'),
(3,04,'Cafe Marigold','Aadhaar card','Mumbai');


-- 3. Menu Items
CREATE TABLE menu_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    item_name VARCHAR(100),
    price DECIMAL(8,2),
    category VARCHAR(50)
);

insert into menu_items(item_id,resto_id,item_name,price,category)values
(101,1,'Veg Sandwich',70,'Snacks'),
(102,2,'Dosa',90,'Snacks'),
(103,3,'Rabdi',70,'Dessert'),
(104,4,'Ice-Cream',80,'Dessert'),
(105,5,'Noodles',70,'Snacks');

-- 4. Restaurant Tables
CREATE TABLE restaurant_tables (
    table_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    capacity INT,
    charge DECIMAL(8,2),
    category enum('Gold', 'Silver', 'Premium')
);

insert into restaurant_tables(table_id,resto_id,capacity,charge,category)values
(1001,1,4,635.8,'Gold'),
(1002,2,6,567.8,'Silver'),
(1003,3,2,978.8,'Premium');

-- 5. Reviews
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    resto_id INT,
    customer_id INT,
    comment TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

insert into reviews(review_id,resto_id,customer_id,comment,rating)values
(123,1,001,'Good Ambiance',4),
(125,2,002,'Affordable',3),
(153,1,003,'Good Ambiance',3);


-- 6. Bookings
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    resto_id INT,
    table_ids Json,
    start_time DATETIME,
    end_time DATETIME,
    status enum('Booked', 'Cancelled', 'Completed') DEFAULT 'Booked'
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
