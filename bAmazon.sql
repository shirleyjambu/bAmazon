DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) default 'MISC',
  price FLOAT(10,2) NOT NULL,
  stock_quantity INTEGER(10) default 0 
);

-- Mock Data
INSERT INTO products
  (product_name,department_name,price,stock_quantity)
 values
  ('Lego Creator','Toys',15.50,30),
  ('Harry Potter','Books',10,3),
  ('Lamp','Home',30,32),
  ('AA Batteries','Home',14.99,5),
  ('BlueTooth EarPhone','Tech',74.56,10),
  ('Vehicle DashCam','Tech',49.99,12),
  ('Mason Jar Sconce','Home',22.69,5),
  ('Pan Organizer','Home',16.87,4),
  ('Wall Mounted Wine Rack','Home',29.97,50),
  ('Wireless Charging Station','Tech',13.99,23);



   