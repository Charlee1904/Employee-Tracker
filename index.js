const mysql = require('mysql');
const inquirer =require('inquirer');

inquirer.prompt([
    {
        type:"list",
        message:"What would you like to do?",
        choices:[
            "View All Employees",
            "View All Employees By Department",
            "View ALL Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
        ],
        name:"selection",
    },

])