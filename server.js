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
            case 'Finished':
                exit();
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

    inquirer.prompt({
        type: 'input',
        name: 'newDepo',
        message: 'Input the department you would like too add.'
    }).then(function (answer) {
        db.query('INSERT INTO department (name) VALUES (?)', [answer.newDepo], function (err, results) {
            if (err) throw err;
            console.log("Database Updated!");
        })
        askUser();
    })


};

function addRole() {

    inquirer.prompt([{
        type: 'input',
        name: 'newRole',
        message: 'Input the role you would like too add.'
    },
    {
        type: 'input',
        name: 'newSalary',
        message: 'How much does this role pay? (before taxes)'
    },
    {
        type: 'input',
        name: 'newDepoId',
        message: 'Please enter the department ID for this role'
    },
    ]).then(function (answer) {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answer.newRole, answer.newSalary, answer.newDepoId], function (err, results) {
            if (err) throw err;
            console.table(res);
        })
        askUser();
    })



};

function addEmployee() {

    inquirer.prompt([{
        type: 'input',
        name: 'newFirst',
        message: 'What is the new employees First Name?'
    },
    {
        type: 'input',
        name: 'newLast',
        message: 'What is the new employees Last Name?'
    },
    {
        type: 'input',
        name: 'newRoleId',
        message: 'Please enter the new employees role ID.'
    },
    {
        type: 'input',
        name: 'newManId',
        message: 'Please enter the new employees manager ID.'
    },
    ]).then(function (answer) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answer.newFirst, answer.newLast, answer.newRoleId, answer.newManId], function (err, results) {
            if (err) throw err;
            console.log("Database Updated!");
        })
        askUser();
    })



};

function updateEmpRole(){
    inquirer.prompt([{

        type: 'input',
        name: 'updateEmp',
        message: 'What is Employees Last Name?'
    },
    {
        type: 'input',
        name: 'updateRole',
        message: 'Please input Employees new Role ID.'
    },
    ]).then(function (answer) {
        db.query('UPDATE employee SET role_id=? WHERE last_name=?', [answer.updateRole, answer.updateEmp], function (err, results) {
            if (err) throw err;
            console.log("Database Updated!");
        })
        askUser();
    })

};

function exit(){
    process.exit();
};