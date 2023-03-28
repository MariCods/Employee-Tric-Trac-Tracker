INSERT INTO departments(name)
VALUES ("Design"),
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

INSERT INTO role(role_id, title, salary, departments_id)
VALUES (2,"Senior Designer", 500.000.00, 0),
       (3,"Senior Marketing", 650.000.00, 1),
       (4,"Senior Merchandising Exec", 750.000.00, 2),
       (5,"Senior Patterner", 650.000.00, 3),
       (6,"Senior Sampler", 650.000.00, 4),
       (6,"Senior Shopper", 650.000.00, 5),
       (8,"Senior Accessorizer", 650.000.00, 6),
       (9,"Senior Testing Lab Associate", 650.000.00, 7),
       (10,"Senior Product Control Manager", 650.000.00, 8),
       (11,"Senior Clothing Design Team Member", 650.000.00, 9),
       (12,"Senior Garment Cleaner", 650.000.00, 10),
        (13,"Senior Quality Contr0l Manager", 650.000.00, 11),
        (14,"Senior Machine Maintenance", 650.000.00, 12),
       (14,"Senior Finishing Associate", 650.000.00, 13),
       (15,"Senior HR", 650.000.00, 14),
       (1, "CEO", 1.000.000, 15);

INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES (11, "Maryam", "Selassie", 1, NULL)
       (22, "Anna", "Brown", 15, 11)
       ()
      
      

