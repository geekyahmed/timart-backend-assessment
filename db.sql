CREATE DATABASE tmart_db;
USE tmart_db;

CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Orders (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  order_date DATETIME NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (username, email) VALUES
  ('user1', 'user1@example.com'),
  ('user2', 'user2@example.com'),
  ('user1000', 'user1000@example.com');

INSERT INTO Orders (user_id, name, order_date, total_amount) VALUES
  (1, 'Product 1', '2023-10-20', 100.00),
  (2, 'Product 2', '2023-10-21', 200.00),
  (1, 'Product 3', '2023-11-19', 5000.00);

SELECT
  u.id as user_id,
  u.username,
  u.email,
  COUNT(*) AS order_count
FROM tmart_db.orders o
INNER JOIN tmart_db.users u ON u.id = o.user_id
GROUP BY o.user_id
ORDER BY order_count DESC
LIMIT 10;

