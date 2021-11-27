const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
//use dotenv so that credentials can be hidden



//code for figlet for special graphic at stat of application.
var figlet = require('figlet');
const { EmptyResultError } = require('sequelize/dist');
const { extensions } = require('sequelize/dist/lib/utils/validator-extras');
const { mapFinderOptions } = require('sequelize/dist/lib/utils');
console.log("")
console.log("")
figlet('\nEmployee Tracker\n', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log('')

    menu()

});


//create connecting ti SQL database. 
const db = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employees_db database.')
);




function menu() {
    inquirer.prompt([{
        type: "list",
        message: "Welcome to the employee trakcer. Here you can select the options to view your work strucure and make changes, ",
        name: "menu",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Emplyoee Role",
            "Exit"
        ]
    }])


    .then(function(data) {
            if (data.menu === "View All Departments") return viewAllDepartments();
            if (data.menu === "View All Roles") return viewAllRoles();
            if (data.menu === "View All Employees") return viewAllEmployees();
            if (data.menu === "Add A Department") return addADepartment();
            if (data.menu === "Add A Role") return addARole();
            // if (data.menu === "Add an Employee") return addAnEmpployee();
            // these are not done yet
            // if (data.menu === "Add An Employee") return addAnEmployee();
            // if (data.menu === "Update An Employee Role") return update(); 
            // if (data.menu === "Exit Application") return exit(); 

        })
        // .then((answer) => {
        //     switch (answer.menu) {
        //         case "View All Departments":
        //             viewAllDepartments();

    //             break;
    //         case "View All Roles":
    //             viewAllRoles();

    //             break;
    //         case "View All Employees":
    //             viewAllEmployees();

    //             break;
    //         case "Add A Department":
    //             addADepartment();

    //             break;
    //         case "Add A Role":
    //             addARole();

    //             break;
    //         case "Add An Employee":
    //             addAnEmployee();

    //             break;
    //         case "Update An Employee Role":
    //             updateAnEmployeeRole();

    //             break;
    //         case "Exit Application":
    //             console.log('Exiting the app ...\n');
    //             connection.end();
    //             break;
    //         default:
    //             console.log(`Invalid Selection: ${answer.menu}`);
    //             break;
    //     }
    // })


};


// query the database, get function to view all departments. 
async function viewAllDepartments() {
    db.query('SELECT department.name AS DepartmentName, department.id AS DeperatmentID FROM department', function(err, results) {
        if (err) throw err;
        console.log("")

        console.table(results);
        menu()
    });

};


// query the database, get function to view all roles. 
function viewAllRoles() {
    db.query('SELECT role.title AS JobTitle, role.id AS RoleID, role.department_id AS DepartmentID, role.salary AS AnnualSalary FROM role', function(err, results) {
        if (err) throw err;
        console.log("")

        console.table(results);
        menu()
    });

};

// query the database, get function to view all employees . 
function viewAllEmployees() {
    db.query('SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", employee.manager_id AS "Manager ID", role.title AS "Job Title", role.salary AS "Annual Salary", department.name AS "Department Name", concat(manager.first_name, " " , manager.last_name) AS "Manager Name" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id  ORDER BY employee.id', function(err, results) {
        if (err) throw err;
        console.log("")

        console.table(results);
        menu()
    });

};

//query the database, get function to add a new department. 
function addADepartment() {
    console.log("Adding a new department")
    inquirer.prompt([{
        type: "input",
        name: "newDepName",
        message: "What is the name for your new Department?"
    }]).then(answers => {
        db.query('INSERT INTO department(name) VALUES (?)', [answers.newDepName], (err, results) => {
            if (err) throw err;
            // console.table(results);
            menu()
        })
    })
}

//this is not working, NOT ALLOWING ME TO DO ANOTHER inquirer Prompt. 
// inquirer.prompt([{
//     type: "list",
//     message: "How would you like to proceed?",
//     name: "options",
//     choices: [
//         "Back to Main Menu",
//         "View All Departments",
//         "Exit Application"
//     ]
// }]).then(function(data) {
//     if (data.options === "Back to Main Menu") return menu();
//     if (data.options === "View All Deparmtners") return viewAllDepartments();
//     if (data.options === "Exit Application") return extensions();
// })



//query the database, make a function to add a ROLE, must include, NAME, SALARY and DEPARTMENT for the role.  


//query the database, get function to add a new role. 


function addARole() {

    db.query('SELECT department.id, department.name FROM department', function(err, results) {
        if (err) throw err;
    }).then(([rows]) => {
            let departmentNames = rows;

            let currentDepNames = departmentNames.map(({ id, name }) => ({
                name: name,
                value: id

            }))

            console.log("Adding a new role") inquirer.prompt([{
                    type: "input",
                    name: "newRoleName",
                    message: "What is the title of the new role?"
                },
                {
                    type: "number",
                    name: "newRoleSalary",
                    message: "What is the salary for the new role?"
                },
                {
                    type: "list",
                    name: "newRoleDep",
                    message: "What department does this role belong too?"
                    choices: [currentDepNames],
                }
            ]).then(answers => {
                db.query('INSERT INTO role(title, salary, departmen_id) VALUES (?) (?) (?)' [answers.newRoleName, answers.newRoleSalary, answers.newRoleDep], (err, results) => {
                    if (err) throw err;
                    menu()
                })
            })
        }
    }


    module.exports = menu;