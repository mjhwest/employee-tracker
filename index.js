const inquirer = require('inquirer');
const mysql = require('mysql2');
//https://www.npmjs.com/package/mysql2  <<<<<<<< documentation 


const table = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');
//https://www.npmjs.com/package/console.table <<<<<<<documentation here


// const logo = require('asciiart-logo');
// https://www.npmjs.com/package/asciiart-logo/v/0.2.5 <<<<<<<<<<documentation

// require('dotenv').config();
// //use dotenv so that credentials can be hidden



//readme for homework says "use a seprare file that contains functions for perfroming specigic SQL queries"
//need to create a folder than contains function for
//1) View All department, 2) View All Roles, 3) View All employees, 4) Add a department, 5) Add a role
//6) Add an employee, 7) Update employee role. 




const employeeTracker = () => {

    const menu = () => {
        inquirer.prompt([{
            type: "list",
            message: "Main Menu",
            name: "Menu",
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
                    viewAllDeparments();

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
        menu()
    };









    module.exports = employeeTracker;
}