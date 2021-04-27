const mysql = require('mysql');
const inquirer =require('inquirer');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"password",
    database:"employee_DB",
});

const start =()=>{
    inquirer
        .prompt({
            type:"list",
            message:"What would you like to do?",
            choices:
                [
                    "View All Employees",
                    "View All Departments",
                    "View All Managers",
                    "Add Employee",
                    "Add Department",
                    "Add Roles",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "exit",
                ],
            name:"selection",
        })
        .then ((answer)=>{
            if (answer.selection === "View All Employees"){
                viewAllEmployees();

            } else if (answer.selection === "View All Departments") {
                viewAllDepart();
            } else if(answer.selection === "View All Managers"){
                viewAllManager();
            } else if(answer.selection === "Add Employee"){
                addEmployee();
            }else if(answer.selection === "Add Department"){
                addDepartment();
            }else if(answer.selection === "Add Roles"){
                addRole();
            } else if(answer.selection === "Remove Employee"){
                removeEmployee();
            } else if(answer.selection === "Update Employee Role"){
                updateEmployeeRole();
            } else if(answer.selection === "Update Employee Manager"){
                updateEmployeeManager();
            }
            else if(answer.selection === "exit"){
                exit();
            }
        });
    };

    const viewAllEmployees = () => {
       connection.query('SELECT * FROM employee',(err,res)=>{
           if(err)throw err;
           console.table(res);
           start();
       });
    };

    const viewAllDepart = () => {
        connection.query('SELECT name from department',(err,res)=>{
            if(err)throw err;
            console.table(res);
            start();
        });
     };

     const viewAllManager= () => {
        connection.query('SELECT first_name,last_name,manager_id FROM employee WHERE role_id BETWEEN 2 AND 10',(err,res)=>{
            if(err)throw err;
            console.table(res);
            start();
        });
     }; 
     
     const addEmployee= () => {
        
        inquirer
        .prompt([
            {
                name:"first_name",
                type:"input",
                message:"What is the employee's First_Name?",
            },
            {
                name:"last_name",
                type:"input",
                message:"What is the employee's last_name?",
            },
            {
                name:"role",
                type:"input",
                message:"What is the employee number?",
            },
            {
                name:"manager",
                type:"input",
                message:"What is the employee's manager id",
            },
        ])
        .then((answer)=>{
            connection.query(
                "INSERT INTO employee SET ?",
            {
                first_name:answer.first_name,
                last_name:answer.last_name,
                role_id:answer.role,
                manager_id:answer.manager,
            },
            (err)=>{
                if(err)throw err;
                console.log("Added new employee");
                start();
            }
            );
        });
    };


    const addDepartment= () => {
        
        inquirer
        .prompt([
            {
                name:"Department",
                type:"input",
                message:"What is the Department you'd like to add?",
            },
           
        ])
        .then((answer)=>{
            connection.query(
                "INSERT INTO department SET ?",
            {
                name:answer.Department,
            },
            (err)=>{
                if(err)throw err;
                console.log("Added new Department");
                start();
            }
            );
        });
    };

    const addRole= () => {
        
        inquirer
        .prompt([
            {
                name:"title",
                type:"input",
                message:"What is the title?",
            },
            {
                name:"salary",
                type:"input",
                message:"What is the salary",
            },
            {
                name:"department_id",
                type:"input",
                message:"What is the Department id?",
            },
           
        ])
        .then((answer)=>{
            connection.query(
                "INSERT INTO role SET ?",
            {
                title:answer.title,
                salary:answer.salary,
                department_id:answer.department_id,
            },
            (err)=>{
                if(err)throw err;
                console.log("Added new role");
                start();
            }
            );
        });
    };



    const updateEmployeeRole= () => {    
        inquirer
        .prompt(
            {
                name:"newRole",
                type:"input",
                message:"Which employee role would you like to update?",
            })
        .then((answer)=>{
            let query ="SELECT first_name,last_name FROM employee";
            connection.query(query,[answer.employee],(err,res)=>{
                console.table(res);
            });
             (err)=>{
                 if(err)throw err;
                 console.log("Added new employee role");
                 start();
        }}
    )};
        



// const removeEmployee=() =>{
//     connection.query(
//         'select * from employee' (err,results),
//         (err, results)=>{
//             if (err) {
//                 throw err;
//             }
//         }
//     );
// };
const exit = () =>{
    connection.end();
}
    connection.connect((err)=>{
        if(err) throw err;
        start()
    });
