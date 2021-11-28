const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
//use dotenv so that credentials can be hidden



//code for figlet for special graphic at stat of application.
var figlet = require('figlet');
const { EmptyResultError } = require('sequelize/dist');
const { extensions } = require('sequelize/dist/lib/utils/validator-extras');
const { mapFinderOptions } = require('sequelize/dist/lib/utils');
const { UPDATE } = require('sequelize/dist/lib/query-types');
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
            "Update An Employee Role",
            "Exit"
        ]
    }])


    .then(function(data) {
        if (data.menu === "View All Departments") return viewAllDepartments();
        if (data.menu === "View All Roles") return viewAllRoles();
        if (data.menu === "View All Employees") return viewAllEmployees();
        if (data.menu === "Add A Department") return addADepartment();
        if (data.menu === "Add A Role") return addARole();
        if (data.menu === "Add An Employee") return addAnEmployee();
        if (data.menu === "Update An Employee Role") return update();
        // these are not done yet
        // if (data.menu === "Update An Employee Role") return update(); 
        // if (data.menu === "Exit Application") return exit(); 
    })
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
    db.query('SELECT role.title AS "Role", role.id AS "Role ID" , role.salary AS "Annual Salary", department.name AS Department FROM role JOIN department ON department.id = role.department_id', function(err, results) {
        if (err) throw err;
        console.log("")
        console.table(results);
        menu()
    });
};

// query the database, get function to view all employees . 
function viewAllEmployees() {
    db.query('SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Role", role.salary AS "Annual Salary", department.name AS "Department Name", concat(manager.first_name, " " , manager.last_name) AS "Manager Name" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id  ORDER BY employee.id', function(err, results) {
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
            console.log("Added a new department!")
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
    console.log("Adding a new role")
    db.promise().query('SELECT department.id, department.name FROM department')
        .then(([rows]) => {

            let currentDepNames = rows
            console.log("ggg", currentDepNames)
            let departmentChoices = currentDepNames.map(({ id, name }) => ({
                name: name,
                value: id
            }))

            // console.log(departmentChoices)
            inquirer.prompt([{
                    type: "input",
                    name: "title",
                    message: "What is the title of the new role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for the new role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "What department does this role belong too?",
                    choices: departmentChoices
                },
            ]).then(answers => {
                db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);', [answers.title, answers.salary, answers.department_id], (err, results) => {
                    if (err) throw err;
                    console.log("New role added to role database.")
                    menu()
                })


            })

        })
}

//query the database, make a function to add an employee, must include first name, last name, role, manager and have it added to employee database.   
//query the database, get function to add a new employee. 
function addAnEmployee() {
    //function adding an employee
    console.log("Adding a new employee")
    db.promise().query('SELECT role.id, role.title FROM role')
        //using the role.id and role.title from role table to pull data. 
        .then(([rows]) => {
            //using another function called rows 
            let currentRole = rows
                //currentRole = rows, which is made up of role.title and role.id 
            let roleChoices = currentRole.map(({ id, title }) => ({
                //rolechoices = currentRole (which is title and ID, and you are mapping a new array object with with name output of title (which matches role.title) and an integ value of ID which matches role.id
                name: title,
                value: id
            }));

            db.promise().query('SELECT employee.id,  concat(employee.first_name," ",employee.last_name) AS Employee FROM employee')
                .then(([rows]) => {
                    let currentEmployee = rows
                    let manager = currentEmployee.map(({ id, Employee }) => ({
                        value: id,
                        name: Employee
                    }));


                    inquirer.prompt([{
                            type: "input",
                            name: "first_name",
                            message: "What is the employees first name?"
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "What is the employees last name?"
                        },
                        {
                            type: "list",
                            name: "role_id",
                            message: "What role will this employee be part of?",
                            choices: roleChoices
                        },
                        {
                            type: "list",
                            name: "manager_id",
                            message: "Who will be this employees manager?",
                            choices: manager
                        }
                    ]).then(answers => {
                        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, results) => {
                            // console.log(results)
                            if (err) throw err;
                            console.log("New employee added to employee database.")
                            menu()
                        })
                    })
                })
        })
}

//query the database, make a function to update an employee; select an emplyoee to update, update their role and ALL info updated in Database
//query the database,  function to update employee. 

function update() {
    console.log("Updating employee information")

    db.promise().query('SELECT employee.id, concat(employee.first_name, " ", employee.last_name) AS Employee from employee')
        .then(([rows]) => {
            let whichEmployee = rows
            let selectEmployee = whichEmployee.map(({ id, Employee }) => ({
                value: id,
                name: Employee
            }));

            //select the role.title for upate. 
            db.promise().query('SELECT role.title AS "Role" from role')
                .then(([rows]) => {
                    let whatRole = rows
                    let updatedRole = whatRole.map(({ id, Role }) => ({
                        value: id,
                        name: Role
                    }));



                    inquirer.prompt([{
                            type: "list",
                            name: "employee_pick",
                            message: "Which employee would you like to update?",
                            choices: selectEmployee
                        },
                        {
                            type: "list",
                            name: "new_role",
                            message: "What role will this employee being changing too?",
                            choices: updatedRole
                        }



                    ]).then(answers => {
                        db.query('INSERT INTO')
                    })
                })
        })
}

module.exports = menu;