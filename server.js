const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table")

var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password: '36196825',
    database:'employeeDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id" + connection.threadId)
    introPrompt();
});

function introPrompt() {
    inquirer.prompt({
        name:"intro",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add new department",
            "Add new employee",
            "Add new role",
            "View all departments",
            "View all employees",
            "View all roles",
            "Update employee role",
            "EXIT"
        ]
    }).then(function (userInput) {
        switch (userInput.intro) {
            case "Add New Department":
                addNewDepartment();
                break;

            case "Add New Employee":
                addNewEmployee();
                break;

            case "Add New Role":
                addNewRole();
                break;
    

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}