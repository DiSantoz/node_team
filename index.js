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
            console.log(managerInput);
    })
}

teamManager();