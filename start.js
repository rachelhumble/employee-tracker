var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql123",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  startapp();
});

function startapp() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "Add employee",
                "Remove employee",
                "View roles",
                "Add role",
                "Delete role",
                "View departments",
                "Add department",
                "Remove department",
                "Update employee role"
            ]
        })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employees":
        employeeSearch();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "Remove employee":
        removeEmployee();
        break;

      case "View roles":
        viewRoles();
        break;

      case "Add role":
        addRole();
        break;

      case "Delete role":
        deleteRole();
        break;

      case "View departments":
        viewDepartments();
        break;

      case "Remove department":
        removeDepartment();
        break;

      case "Update employee role":
        updateEmployeeRole();
        break;
      }
    });
}