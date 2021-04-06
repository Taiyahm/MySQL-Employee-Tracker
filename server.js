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
    console.log(chalk.green("Connected as Id: " + connection.threadId)),
    introPrompt();
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

            case "Update Employee Role":
                roleUpdate();
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

            case "EXIT":
                connection.end();
                break;
        }
    });
}

const viewAllEmployees = () => {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(chalk.yellow("Employees"),res)
        introPrompt();
    });
}

const viewAllDepartments = () => {
    var query = "SELECT * FROM department"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(chalk.yellow("Departments"),res)
        introPrompt();
    });
}

const viewAllRoles = () => {
    var query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(chalk.yellow("Roles"),res)
        introPrompt();
    });
}
