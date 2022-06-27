INSERT INTO department (name)
VALUES
('Sales'),
('Tech'),
('Accounting'),
('Labor');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Sales Agent', 75000, 1),
('Front End Developer', 115000, 2),
('Back End Developer', 150000, 2),
('Senior Accountant', 200000, 3),
('Junior Accountant', 135000, 3),
('Field Tech', 85000, 4),
('Driver', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ben', 'Ashworth', 1, null),
('Sam', 'Becker', 2, 1),
('Max', 'Mckinley', 3, null),
('Cale', 'Tucker', 4, 3),
('Brandon', 'Lackner', 5, null),
('Justin', 'Winans', 6, 5),
('Joey', 'Rueswald', 7, null),
('Collin', 'Mondrick', 8, 7);

