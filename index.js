const { prompt } = require("inquirer");
// const fs = require('fs');
const db = require("./connection");
require("console.table");
init();
function init() {
  questionPrompts()
}

function viewAllEmployees() {
  return db.promise().query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.departments_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );
}

function addStaff(employee) {
  return db.promise().query("INSERT INTO employee SET ?", employee);
}
function removeStaffMember(role_id) {
  return db.promise().query(
    "DELETE FROM employee WHERE id = ?", [role_id]
  );
}
function updateEmployeeRole(employeeId, roleId) {
  return db.promise().query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [roleId, employeeId]
  );
}
function viewAllRoles() {
  return db.promise().query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
  );
}
// function removeEmployeeManager(managerid) {
//   return db.promise().query(
//     "DELETE FROM manager WHERE id",
//     [managerid]
//   );
// }
// function updateEmployeeManager(employeeId, managerId) {
//   return db.promise().query(
//     "UPDATE employee SET manager_id = ? WHERE id = ?",
//     [managerId, employeeId]
//   );
// }
// function addRole(role) {
//   return db.promise().query("INSERT INTO role SET ?", role);
// }
// function removeRole(roleId) {
//   return db.promise().query("DELETE FROM role WHERE id = ?", roleId);
// }
// function viewAllDepartments() {
//   return db.promise().query(
//     "SELECT department.id, department.name FROM department;"
//   );
// }
// function addMoreDepartments(deparments) {
//   return db.promise().query("INSERT INTO departments SET ?", deparments);
// }
// function updateDepartments(name) {
//   return db.promise().query(
//     "UPDATE department SET name = ? WHERE id = ?",
//     [name]
//   );
// }
//function viewALLSalaries() {
//   return db.promise().query(
//     "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department.id = department.id GROUP BY department.id, department.name;"
//   );
// }



function findAllEmployees() {
  viewAllEmployees()
    .then(([res]) => {
      console.table(res)
      questionPrompts()
    })
}
function viewIncome() {
  viewALLSalaries()
  .then(([res]) => {
    console.table(res)
    questionPrompts()
})
}

function addEmployee() {
  //ask about the new employee
  viewAllEmployees()
    .then(([employeeData]) => {
      const staffChoices = employeeData.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id

      }));

      prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the new employees first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the new employees last name?"
        },
        {
          name: "role_id",
          type: "input",
          message: "What is the new employees role in the company?"
        },
        {
          name: "manager_id",
          type: "list",
          message: "What is the new employees manager?",
          choices: staffChoices
        },
      ])
        .then(employee => {

          addStaff(employee)

            .then(() => console.log("Added employee to the database"))
            .then(() => questionPrompts())


        })
    })
}

function removeEmployee() {
  viewAllEmployees()
    .then(([employeeData]) => {
      const removeChoices = employeeData.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id

      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: removeChoices
        }
      ])
        .then(({ employeeId }) => removeStaffMember(employeeId))
        .then(() => console.log("Removed employee from the database"))
        .then(() => questionPrompts())
    })
}
function updateStaffRole() {
  viewAllEmployees()
    .then(([employeeData]) => {
      const updateEmpChoices = employeeData.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id

      }));
      viewAllRoles()
        .then(([employeeData]) => {
          const roleChoices = employeeData.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Which employee do you want to update?",
              choices: updateEmpChoices
            },

            {
              type: "list",
              name: "roleId",
              message: "Which role do you want to assign the selected employee?",
              choices: roleChoices
            }
          ])
            .then(({res}) => updateEmployeeRole(res.employeeId, res.roleId))
            .then(() => console.log("Updated employee's role"))
            .then(() => questionPrompts())
        });
    });
}


function exitTerminal() {
  console.log("Goodbye!");
  process.exit();
}
function questionPrompts() {
  prompt([
    {
      type: "list",
      name: "questions",
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

    console.log(questions)
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
        updateStaffRole();
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
        viewIncome();
        break;
      default:
        exitTerminal();
    }
  })
}











// module.exports = new Table(db);