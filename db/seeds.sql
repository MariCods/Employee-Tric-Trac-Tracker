USE company_db
INSERT INTO department(name)
VALUES
        ("Design"),
        ("Marketing and Business Development"),
        ("Merchandising"),
        ("Pattern Making, CAD"),
        ("Sampling"),
        ("Fabric Store and Fabric Sourcing"),
        ("Trims and Accessory Store"),
        ("Fabric Testing Lab"),
        ("Production Planning and Control"),
        ("Cutting, Sewing"),
        ("Garment Washing"),
        ("Quality Control"),
        ("Machine Maintenance"),
        ("Finishing:Printing, Embrodery"),
        ("Human Resources"),
        ("Executive");

INSERT INTO role(title, salary, departments_id)
VALUES
        ("Senior Designer", 500000.00, 0),
        ("Design Team Member", 5000.00,0),
        ("Senior Marketing", 650000.00, 1),
        ("Senior Merchandising Exec", 750000.00, 2),
        ("Senior Patterner", 650000.00, 3),
        ("Senior Sampler", 650000.00, 4),
        ("Senior Shopper", 650000.00, 5),
        ("Shop Assistant", 10000.00, 5),
        ("Senior Accessorizer", 650000.00, 6),
        ("Senior Testing Lab Associate", 650000.00, 7),
        ("Senior Product Control Manager", 650000.00, 8),
        ("Quality Control Associate",650000.00,9),
        ("Senior Garment Cleaner", 650000.00, 10),
        ("Senior Quality Control Manager", 650000.00, 11),
        ("Senior Machine Maintenance", 650000.00, 12),
        ("Senior Pattern Printing Associate",650000.00,13),
        ("Senior HR", 650000.00, 14),
        ("CEO", 100000.00, 15);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
        ("Maryam", "Selassie", 17, NULL),
        ("Anna", "Brown", 16, 1),
        ("Reese", "Lewis", 15, 1),
        ("Robert", "Cho", 14, 1),
        ("Gustavo", "Martinez", 13, 1),
        ("Maria", "Sloane", 6, 1),
        ("Justin", "Crisley", 7, 6),
        ("Mariah", "Wilson", 12, 1), 
        ("Abby", "Lee", 11, 1);