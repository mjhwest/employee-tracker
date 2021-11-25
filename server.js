const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./config/connection');

require('dotenv').config();
//use dotenv so that credentials can be hidden



//code for figlet for special graphic at stat of application.
var figlet = require('figlet');
figlet('\nEmployee Tracker\n', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
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

//connect to server and DB
// connection.connect(function(err) {
//     if (err) throw err;
//     runPrompt();
// });

// async function runPrompt() {


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
            "Exit Applicatoin"
        ]
    }])

    // if (choice.name === "View All Deparments") {
    //     await department.viewAllDepartments()
    //     init()
    // }


    //undo here

    .then(function(data) {
            if (data.menu === "View All Departments") return viewAllDepartments();
            if (data.menu === "View All Roles") return viewAllRoles();
            if (data.menu === "View All Employees") return viewAllEmployees();

            // these are not done yet
            // if (data.menu === "Add A Department") return addADepartment();
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
function viewAllDepartments() {
    db.query('select department.id AS ID, department.name AS Department from department', function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    menu()
};


// query the database, get function to view all roles. 
function viewAllRoles() {
    db.query('select role.id AS ID, role.title AS Position, role.salary AS Salary, role.department_id AS Department from role', function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    menu()
};

// query the database, get function to view all employees . 
function viewAllEmployees() {
    db.query('select employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, employee.role_id AS roleID, employee.manager_id AS ManagerID from employee', function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    menu()
};

menu()


// }


module.exports = menu;