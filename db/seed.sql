INSERT INTO department (department_name) 
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal"),

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead", 130000, 1),
    ("Salesperson", 120000, 1),
    ("Lead Engineer", 100000, 2),
    ("Software Engineer",100000, 2),
    ("Accountant",  93750, 3),
    ("Lawyer", 180000, 4),
    ("Legal Team Lead", 127000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Mya","Gomez",3,NULL);
    ("Mark","Jones",5,NULL);
    ("Jessica","James",6,NULL);
    ("Tina","Moore",4,3);
    ("Mary","Johnson",4,3);
    ("Marcus","Smart",1,1);
    ("James","Mason",2,6);
    ("Jamie","Mars",7,4);
