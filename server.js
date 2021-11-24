const inquirer = require('inquirer');
const mysql = require('mysql2');
//https://www.npmjs.com/package/mysql2  <<<<<<<< documentation 

const table = require('console.table');
//https://www.npmjs.com/package/console.table <<<<<<<documentation here


require('dotenv').config();
//use dotenv so that credentials can be hidden

//code for figlet for special graphic at stat of application.
var figlet = require('figlet');
const connection = require('./config/connection');
figlet('Employee Tracker', function(err, data) {
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
// db.connect(function(err) {
//     if (err) throw err;
//     selectMenu();
// });


//readme for homework says "use a seprare file that contains functions for perfroming specigic SQL queries"
//need to create a folder than contains function for
//1) View All department, 2) View All Roles, 3) View All employees, 4) Add a department, 5) Add a role
//6) Add an employee, 7) Update employee role. 




const menu = () => {
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

    .then((answer) => {
        switch (answer.menu) {
            case "View All Departments":
                viewAllDepartments();

                break;
            case "View All Roles":
                viewAllRoles();

                break;
            case "View All Employees":
                viewAllEmployees();

                break;
            case "Add A Department":
                addADepartment();

                break;
            case "Add A Role":
                addARole();

                break;
            case "Add An Employee":
                addAnEmployee();

                break;
            case "Update An Employee Role":
                updateAnEmployeeRole();

                break;
            case "Exit Application":
                console.log('Exiting the app ...\n');
                connection.end();
                break;
            default:
                console.log(`Invalid Selection: ${answer.menu}`);
                break;
        }
    })

    // menu()
};


// query the database, get function to view all departments. 
function viewAllDepartments() {
    db.query('SELECT * FROM department', function(err, results) {
        if (err) throw err;
        console.table(results);
        // menu();
    });
    menu()
};

menu()





module.exports = menu;