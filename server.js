const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    askUser();
})

const askUser = () => {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Welcome to Employee Database! What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }).then(function (answers) {
        switch (answers.choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmpRole();
                break;
            default:
                break;

        }
    })
};

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table('Viewing All Departments:', results);
        askUser();
    });
};

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table('Viewing All Roles:', results);
        askUser();
    });
};

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table('Viewing All Employees:', results);
        askUser();
    });
};

function addDepartment() {
    db.query('SELECT * FROM department', function (err, results){
        if (err) throw err;
        inquirer.prompt({
            type: 'input',
            name: 'newDepo',
            message: 'Input the department you would like too add.'
        }).then(function (answer){
            db.query('INSERT INTO department SET')
        })
    })
    
};

function addRole() {

};

function addEmployee() {

};