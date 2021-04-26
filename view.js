const mysql = require('mysql');
const inquirer =require('inquirer');

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"password",
    database:"EmployeeDB",
});

const start =()=>{
    inquirer
        .prompt({
            type:"list",
            message:"What would you like to do?",
            choices:
                [
                    "View All Employees",
                    "View All Employees By Department",
                    "View ALL Employees By Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                ],
            name:"selection",
        })
        .then ((answer)=>{
            if (answer.selection === "View All Employees"){
                viewAllEmployees();

            } else if (answer.selection === "View All Employees By Department") {
                viewAllDepart();
            } else if(answer.selection === "View All Employees By Manager"){
                viewAllManager();
            } else if(answer.selection === "Add Employee"){
                addEmployee();
            } else if(answer.selection === "Remove Employee"){
                removeEmployee();
            } else if(answer.selection === "Update Employee Role"){
                updateEmployeeRole();
            } else if(answer.selection === "Update Employee Manager"){
                updateEmployeeManager();
            }
        });
    };

    const viewAllEmployees = () => {
       connection.query('SELECT * FROM employee',(err,res)=>{
           if(err)throw err;
           console.log(res);
           connection.end();
       });
    };

    const viewAllDepart = () => {
        connection.query('SELECT * FROM employee',(err,res)=>{
            if(err)throw err;
            console.log(res);
            connection.end();
        });
     };


     const viewAllManager= () => {
        connection.query('SELECT * FROM employee',(err,res)=>{
            if(err)throw err;
            console.log(res);
            connection.end();
        });
     };



    connection.connect((err)=>{
        if(err) throw err;
        start()
    });