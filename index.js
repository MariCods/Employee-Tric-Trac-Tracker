const inquirer = require('inquirer');
// const fs = require('fs');
const db = require("./db");
require("console.table");

class Table {
  constructor(db) {
    this.db = db;
  }
  viewAllEmployees() {
    return this.db.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  viewALLSalaries() {
    return this.db.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }
  addEmployee(employee) {
    return this.db.promise().query("INSERT INTO employee SET ?", employee);
  }
  removeEmployee(employeeId) {
    return this.db.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }
  updateEmployeeRole(employeeId, roleId) {
    return this.db.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  removeEmployeeManager(managerid) {
    return this.db.promise().query(
      "DELETE FROM manager WHERE id = ?",
      [managerid]
    );
  }
  updateEmployeeManager(employeeId, managerId) {
    return this.db.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }
  viewAllRoles() {
    return this.db.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  addRole(role) {
    return this.db.promise().query("INSERT INTO role SET ?", role);
  }
  removeRole(roleId) {
    return this.db.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
  viewAllDepartments() {
    return this.db.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }
  addMoreDepartments(deparments) {
    return this.db.promise().query("INSERT INTO departments SET ?", deparments);
  }
  updateDepartments(name) {
    return this.db.promise().query(
      "UPDATE department SET name = ? WHERE id = ?",
      [name]
    );
  }

}


init();
function init() {
  questionPrompts()
}
function questionPrompts() {
  prompt([
    {
      type: "list",
      name: "prompts",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "View_Emp"
        },
        {
          name: "Add Employees",
          value: "Add_Emp"
        },
        {
          name: "Remove Employees",
          value: "Remove_Emp"
        },
        {
          name: "Update Employee Role",
          value: " Update_Emp_Role"
        },
        {
          name: "Add Manager",
          value: "Add_Manager"
        },
        {
          name: "Remove Manager",
          value: "Remove_Manager"
        },
        {
          name: "View All Roles",
          value: "View_All_Roles"
        },
        {
          name: "Add Role",
          value: "Add_Role"
        },
        {
          name: "Remove Role",
          value: "Remove_Role"
        },
        {
          name: "View All Departments",
          value: "View_All_Depts"
        },
        {
          name: "Add More Departments",
          value: "Add_More_Depts"
        },
        {
          name: "Update A Department Name",
          value: "Update_A_Dept_Name"
        },
        {
          name: "View Salaries",
          value: "View_Salaries"
        },
        {
          name: "Exit",
          value: "Exit"
        }
      ]
    }
  ]).then(res => {
    let questions = res.questions;
    switch (questions) {
      case "View_Emp":
        findAllEmployees();
        break;
      case "Add_Emp":
        addEmployee();
        break;
      case "View_Emp":
        viewAllEmployees();
        break;
      case "Remove_Emp":
        removeEmployee();
        break;
      case "Update_Emp_Role":
        updateEmployeeRole();
        break;
      case "Update_Emp_Role":
        updateEmployeeRole();
        break;
      case "Add_Manager":
        updateManagerRole();
        break;
      case "View_All_Roles":
        viewAllRoles();
        break;
      case "Add_Role":
        addRole();
        break;
      case "Remove_Role":
        removeRole();
        break;
      case "Add_More_Depts":
        viewAllDepartments();
        break;
      case "Update_A_Dept_Name":
        addMoreDepartments();
        break;
      case "View_Salaries":
        updateDepartments();
        break;
      default:
        exit();




    }
  })











}
module.exports = new Table(db);