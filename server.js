const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require("figlet");
const consoleTable = require("console.table")

var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password: '36196825',
    database:'employeeDB'
});

const init = () => {
    console.log(
      chalk.cyan.bold(figlet.textSync("Employee Tracker"))
    );
};

init();

connection.connect(function (err) {
    if (err) throw err;
    introPrompt()
    console.log(chalk.green("Connected as Id: " + connection.threadId))
});

function introPrompt() {
    inquirer.prompt({
        name:"intro",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add New Department",
            "Add New Employee",
            "Add New Role",
            "Update Employee Role",
            "EXIT"
        ]
    }).then(function (userInput) {
        switch (userInput.intro) {
             case "View All Employees":
                viewAllEmployees();
                break;
            
            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add New Department":
                addNewDepartment();
                break;

            case "Add New Employee":
                addNewEmployee();
                break;

            case "Add New Role":
                addNewRole();
                break;

            case "Update Employee Role":
                roleUpdate();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}

const viewAllEmployees = () => {
    var query = "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department on role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        introPrompt();
    });
}

const viewAllDepartments = () => {
    var query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        introPrompt();
    });
}

const viewAllRoles = () => {
    var query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        introPrompt();
    });
}

const addNewDepartment = () => {
    var query = 'SELECT name AS "Departments" FROM department';

    connection.query(query, (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                name: "dept",
                type: "input",
                message: "Enter new department name:"
            }
        ])
        .then((answer) => {
            connection.query('INSERT INTO department(name) VALUES( ? )', answer.dept)
            console.table(chalk.red("New department has been added!",))
            introPrompt();
        })
    })
}

const addNewEmployee = () => {
    var role = [];
    const query = 'SELECT role.title, role.id FROM role'
    connection.query(query,(err,res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          role.push(res[i].title);
        }
        inquirer.prompt([
          {
            name: "first",
            type: "input",
            message: "Employee's First Name: "
          },
          {
            name: "last",
            type: "input",
            message: "Employee's Last Name: "
          },
          {
            name: "role",
            type: "list",
            choices: role,
            message: "Employee's Role: "
          },
          {
            name: "manager",
            type: "input",
            message: "Employee manager id: "
          },
        ])
        .then(function (answer) {
          var showRole = res.find(function (getRole) {
            if (answer.role == getRole.title) {
              return getRole;
            }
          });
          connection.query("INSERT INTO employees SET ?",
            {
              first_name: answer.first,
              last_name: answer.last,
              role_id: showRole.id,
              manager_id: answer.manager
            },
            function (err, res) {
              if (err) throw err;
              console.table(chalk.red("New employee role has been added!",))
              introPrompt();
            }
          );
        });
    })
}

const addNewRole = () => {
    var query = 'SELECT * FROM department'
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "newRole",
                type: "input", 
                message: "What role would you like to add: "
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role: "
            },
            {
                name: "Department",
                type: "list",
                choices: function() {
                    var deptArr = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArr.push(res[i].name);
                    }
                    return deptArr;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query('INSERT INTO role SET ?',
            {
                title: answer.newRole,
                salary: answer.salary,
                department_id: department_id
            },
            function (err, res) {
                if(err)throw err;
                console.table(chalk.red("New role has been added!",))
                introPrompt()
            })
        })
    })
};