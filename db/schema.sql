-- drops the employees_db if it exists currently 
DROP DATABASE IF EXISTS employees_db; 
-- creates employees_db database.
CREATE DATABASE employees_db; 
-- use employee_db database. 
USE employees_db; 

-- Create department table
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(30) NOT NULL
); 

-- Create role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL 
); 
-- use CASCADE instead of SET NULL, which means you delete all the department ID 
-- Thurs class, 1.06.00 into video

-- Create employee table 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT, 
    manager_id INT NOT NULL
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
); 

-- NOTE FOR employee table 2 x foreign key 
-- EACH Employee can have a roleID but also an employee can have a managerID

