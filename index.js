const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array of employees
const employees = [];

// Team Manager questions
function teamManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is the name of your manager?'
        },
        {
            type: 'input',
            name: 'managerID',
            message: "What is your manager's ID number ?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is your manager's email address ?"
        },
        {
            type: 'input',
            name: 'managerNumber',
            message: "What is your manager's office number ?"
        },
    ])
        .then((answer) => {
            const managerInput = new Manager(answer.managerName, answer.managerID, answer.managerEmail, answer.managerNumber);
            employees.push(managerInput);
            addEmployee();
        })
}

// add additional employees to the team
function addEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeList',
            message: 'Would you like to add team members ?',
            choices: ['Engineer', 'Intern', 'No, my team is complete!']
        }
    ])
    // conditional statement that checks which choice user selects, runs corresponding function
        .then((response) => {
            console.log(response.employeeList);
            if (response.employeeList === 'Engineer') {
                teamEngineer();
            } else if (response.employeeList === 'Intern') {
                teamIntern();
            } else if (response.employeeList === 'No, my team is complete!') 
                employeeHTML();
            
        })
}

// Engineer questions
function teamEngineer() {
    console.log(`
    ==================
    Add a New Engineer
    ==================
    `);
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is the name of your engineer?'
        },
        {
            type: 'input',
            name: 'engineerID',
            message: "What is your engineer's ID number ?"
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is your engineer's email address ?"
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What is your engineer's GitHub username ?"
        },
    ])
        .then((answer) => {
            const engineerInput = new Engineer(answer.engineerName, answer.engineerID, answer.engineerEmail, answer.engineerGithub);
            employees.push(engineerInput);
            addEmployee();
        })
}

// Intern questions
function teamIntern() {
    console.log(`
    =================
    Add a New Intern
    =================
    `);
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'What is the name of your intern ?'
        },
        {
            type: 'input',
            name: 'internID',
            message: "What is your intern's ID number ?"
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is your intern's email address ?"
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What school does your intern attend ?"
        },
    ])
        .then((answer) => {
            const internInput = new Intern(answer.internName, answer.internID, answer.internEmail, answer.internSchool);
            employees.push(internInput);
            addEmployee();
        })
}

// render HTML based on user inputs for employees
function employeeHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), 'utf8')
    console.log("Your Website is complete and ready to be viewed!");
};

// run teamManager
teamManager();