const {prompt} = require("inquirer");
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
  function viewALLSalaries() {
    return db.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }
  function addStaff() {
    return db.promise().query("INSERT INTO employee");
  }
  function removeStaffMember() {
    return db.promise().query(
      "DELETE FROM employee WHERE id = ?",
    );
  }
  function updateEmployeeRole(employeeId, roleId) {
    return db.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  function removeEmployeeManager(managerid) {
    return db.promise().query(
      "DELETE FROM manager WHERE id",
      [managerid]
    );
  }
  function updateEmployeeManager(employeeId, managerId) {
    return db.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }
  function viewAllRoles() {
    return db.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  function addRole(role) {
    return db.promise().query("INSERT INTO role SET ?", role);
  }
  function removeRole(roleId) {
    return db.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }
  function viewAllDepartments() {
    return db.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }
  function addMoreDepartments(deparments) {
    return db.promise().query("INSERT INTO departments SET ?", deparments);
  }
  function  updateDepartments(name) {
    return db.promise().query(
      "UPDATE department SET name = ? WHERE id = ?",
      [name]
    );
  } 



function findAllEmployees() {
 viewAllEmployees()
  .then(([res])=> {
    console.table(res)
    questionPrompts()
  })

  
}

function addEmployee() {
addStaff()
.then(([columns]) => {
  let staff = columns;
  const staffChoices = staff.map(({id, deparment_id, first_name, last_name, salary}) => ({
    first_name: first_name,
    last_name: last_name,
    salary: salary,
    deparment_id: deparment_id,
    value: id
   
  }));
  prompt([
    {
    name: "first-Name",
    message: "What is the new employees first name?"
    },
    {
      name: "last-Name",
      message: "What is the new employees last name?"
      },
      {
        type: "list",
        name: "Salary",
        message: "What is the new employees starting salary?"
        },
        {
          name: "department-id",
          message: "What is the new employees department?",
          choices: staffChoices
          },
  ])
  .then(([res]) => console.table(res))
  .then(() => console.log("Added employee to the database"))
  .then(()=> questionPrompts())
})} 

function removeEmployee() {
  removeStaffMember()
  .then(([columns]) => {
  let removeStaff = columns;
  const removeChoices = removeStaff.map(({id, first_name,last_name}) =>({
    name: `${first_name} ${last_name}`,
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
    .then(([res]) => removeStaffMember(res))
    .then(() => console.log("Removed employee from the database"))
    .then(() => questionPrompts)
})
}
function updateStaffRole() {
  updateEmployeeRole(employee_id, role_id)
  .then(([columns]) =>{
    let updateStaff = columns;
    const updateEmpChoices = updateStaff.map(({employee_id, role_id}) =>({
      name: `${first_name} ${last_name}`,
    value: employee_id
  }));
  prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to update?",
      choices: updateEmpChoices
    }
  ]) .then(res => {
    let employeeId = res.employeeId;
    viewAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
          }
        ])
          .then(res => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Updated employee's role"))
          .then(() => questionPrompts)
      });
  });
})
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