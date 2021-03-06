var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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

// Inquirer prompts:
function startapp() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add employee",
                "Add department",
                "Add role",
                "Delete employee",
                "Delete department",            
                "Delete role",
                "Update employee role",
                "Exit"
            ]
        })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employees":
        viewEmployees();
        break;

      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "Add department":
        addDepartment();
        break;

      case "Add role":
          addRole();
          break;

      case "Delete employee":
        deleteEmployee();
        break;

      case "Delete department":
          deleteDepartment();
          break;

      case "Delete role":
        deleteRole();
        break;

      case "Update employee role":
        updateEmployeeRole();
        break;

      case "Exit":
        exit();
        break;
      }
    });
}

//Functions:
  //View:
function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Employees:");
    console.table(res);
    startapp();
  });
}

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Departments:");
    console.table(res);
    startapp();
  });
}

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Roles:");
    console.table(res);
    startapp();
  });
}
  //Add:
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "employeeFirst",
        message:"Enter employee first name",
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "Please enter a valid first name"
      },
      {
        name: "employeeLast",
        message:"Enter employee last name",
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "Please enter a valid last name"
      },
      {
        name: "employeeRole",
        message:"Enter employee role ID",
        validate: response => response.match(/^[0-9]+$/) ? true: "Please enter a valid numeric role ID"
      },
      {
        name: "employeeManager",
        message:"Enter employee manager ID",
        validate: response => response.match(/^[0-9]+$/) ? true: "Please enter a valid numeric manager ID"
      },
    ]).then(function(answer) {
      var query = "INSERT into employee (first_name, last_name, roll_id, manager_id) values (?,?,?,?);"; 
      connection.query(query, [answer.employeeFirst, answer.employeeLast, answer.employeeRole, answer.employeeManager], (err, res) => {
        if (err) throw err;
        console.log("New employee added!");
        startapp();
      });
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDept",
        message:"Enter new department name",
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "Please enter a valid department name"
      }
    ]).then(function(answer) {
      var query = "INSERT into department (name) values (?);"; 
      connection.query(query, [answer.newDept], (err, res) => {
        if (err) throw err;
        console.log("New department added!");
        startapp();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        message:"Enter new role title",
        validate: response =>response.match(/^[A-Za-z ]+$/)? true: "Please enter a valid role title"
      },
      {
        name: "roleSalary",
        message:"Enter role salary",
        validate: response => response.match(/^[0-9]+$/) ? true: "Please enter a valid numeric salary"
      },
      {
        name: "roleDept",
        message:"Enter role department ID",
        validate: response => response.match(/^[0-9]+$/) ? true: "Please enter a valid numeric department ID"
      }
    ]).then(function(answer) {
      var query = "INSERT into role (title, salary, department_id) values (?,?,?);"; 
      connection.query(query, [answer.newRole, answer.roleSalary, answer.roleDept], (err, res) => {
        if (err) throw err;
        console.log("New role added!");
        startapp();
      });
    });
}
  //Update:
function updateEmployeeRole() { 
  var query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
      inquirer
        .prompt([
          {
            name: "updateChoice",
            type: "rawlist",
            message:"Select employee to update",
            choices: () => {
              const empList = [];
              for(let i = 0; i < res.length; i++) {
                empList.push(res[i].id);
              }
              return empList;
            }
          },
          {
            name: "newRole",
            message: "Enter new role ID for selected employee",
            validate: response => response.match(/^[0-9]+$/) ? true: "Please enter a valid numeric role ID"
          }
          ]).then(function(answer) {
            var query = "UPDATE employee SET ? WHERE ?";
            connection.query(query, [ {roll_id: answer.newRole}, {id: answer.updateChoice} ], (err, res) => {
              if (err) throw err;
              console.log(`Employee's Role ID updated sucessfully!`);
              startapp();
            })
          })
  });
}
  //Delete:
function deleteEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
      inquirer
        .prompt([
          {
            name: "deleteChoice",
            type: "rawlist",
            message:"Select employee to delete",
            choices: () => {
              const empList = [];
              for(let i = 0; i < res.length; i++) {
                empList.push(res[i].id);
              }
              return empList;
            }
          }
          ]).then(function(answer) {
            var query = "DELETE from employee WHERE ?";
            connection.query(query, [ {id: answer.deleteChoice} ], (err, res) => {
              if (err) throw err;
              console.log(`Employee ID: ${answer.deleteChoice} deleted sucessfully!`);
              startapp();
            })
          })
  });
}

function deleteDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
      inquirer
        .prompt([
          {
            name: "deleteChoice",
            type: "rawlist",
            message:"Select department to delete",
            choices: () => {
              const deptList = [];
              for(let i = 0; i < res.length; i++) {
                deptList.push(res[i].id);
              }
              return deptList;
            }
          }
          ]).then(function(answer) {
            var query = "DELETE from department WHERE ?";
            connection.query(query, [ {id: answer.deleteChoice} ], (err, res) => {
              if (err) throw err;
              console.log(`Department ID: ${answer.deleteChoice} deleted sucessfully!`);
              startapp();
            })
          })
  });
}

function deleteRole() {
  var query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
      inquirer
        .prompt([
          {
            name: "deleteChoice",
            type: "rawlist",
            message:"Select role to delete",
            choices: () => {
              const roleList = [];
              for(let i = 0; i < res.length; i++) {
                roleList.push(res[i].id);
              }
              return roleList;
            }
          }
          ]).then(function(answer) {
            var query = "DELETE from role WHERE ?";
            connection.query(query, [ {id: answer.deleteChoice} ], (err, res) => {
              if (err) throw err;
              console.log(`Role ID: ${answer.deleteChoice} deleted sucessfully!`);
              startapp();
            })
          })
  });
}
  //Exit:
function exit() {
  console.log("Goodbye!");
  connection.end();
}