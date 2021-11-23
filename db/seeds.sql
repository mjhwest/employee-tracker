-- use the employees_db --
USE employees_db; 

-- insert into deparment table>> ID and name values. --
INSERT INTO department (id, name)
VALUES 
(1, "Web Development"), 
(2, "Sales"), 
(3, "Human Resources"), 
(4, "Accounting"), 
(5, "Legal");

-- insert into role table >> id of role, title of role, salary of role and deparmtnet ID--
-- department ID is linked to DEPARTMENT table--
INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "Front End", 75000, 1),
(2, "Back End", 85000, 1),
(3, "Sales Online", 65000, 2),
(4, "Sales Store", 60000, 2),
(5, "HR Advisor", 55000, 3),
(6, "HR Assist", 52000, 3),
(7, "Auditor", 76000, 4),
(8, "Account Managment", 72000, 4),
(9, "Project Accountant", 80000, 4),
(10, "Head Accountant", 95000, 4),
(11, "Paralegal", 75000, 5),
(12, "Lawyer", 95000, 5),
(13, "Head Lawyer", 100000, 5);

-- insert into employee tables>> id of employee, first name, last name, role i.d and manager ID--
-- role id is linked to ROLE table--
-- If manager id is NULL, they do not have a manager. --
-- if employee has a manager ID than their manager is linked to corresponding employee number.--
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Andrew", "Smith", 1, NULL),       
(2, "Steve", "Film", 2, NULL),
(3, "Eliza", "Greem", 3, NULL),
(4, "Alexa", "Prime", 4, NULL),
(5, "Ross", "Dale", 5, NULL),
-- employee 1 to 5 do not have managers--

-- employee 6,7,8,9,10 are front end or back end and all have the manager Andrew Smith --
(6, "Jordan", "Angrel", 1, 1),
(7, "Ashley", "Ronke", 2, 1),
(8, "Sarah", "Flair", 1, 1), 
(9, "Luke", "Yipe", 1, 1), 
(10, "Greg", "Grone", 2, 1), 

-- employee 11,12,13,14,15 are either sales online or sales store and maanger is Steve Film --
(11, "Ben", "Wrot", 3, 2),
(12, "Frank", "Frost", 4, 2), 
(13, "Adam", "Page", 3, 2), 
(14, "Grant", "Shrew", 4, 2), 
(15, "Tom", "Flaw", 4, 2), 

-- employee 16, 17, 18 are either HR advisor or HR assist and manager is Eliza Greem--
(16, "Toby", "Flenderson", 5, 3),
(17, "Sally", "Shaw", 6, 3),
(18, "Robert", "Norff", 6, 3), 

-- employee 19, 20, 21, 22, 23, 24,25, 26 are either Auditor, Account Managermnet, Project Accountant or Head Accountant with Manager is  Alexa Prime --
(19, "Sam", "Cripp", 7, 4),
(20, "Neil", "Palmer", 7, 4), 
(21, "Rover", "Advent", 8, 4),
(22, "Mike", "McQuire", 8, 4),
(23, "Todd", "Snell", 9, 4),
(24, "Drew", "Rivers", 9, 4),
(25, "Will", "Power", 9, 4),
(26, "Tony", "Biggen", 10, 4),

-- employee 27, 28, 29, 30, 31, 32 are either Paralegal, Lawyer or Head Lawyer and manager is Ross Dale --
(27, "Antony", "Floe", 11, 5),
(28, "Zack", "Stan", 11, 5,),
(29, "Bruce", "Lemon", 12, 5),
(30, "Fiona", "Ion", 12, 5),
(31, "Sarah", "Perkins", 12, 5),
(32, "Teddy", "Long", 13, 5);

