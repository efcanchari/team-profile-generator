import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import render from './src/page-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// Function to prompt user for team information
async function promptUser() {
    const teamMembers = [];

    // Example: Prompt for a manager
    const { name, id, email, officeNumber } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number?"
        }
    ]);

    const manager = new Manager(name, id, email, officeNumber);
    teamMembers.push(manager);

    // Add logic to prompt for other roles (Engineer, Intern) and push them to teamMembers...

    return teamMembers;
}

// Function to generate and write HTML file
async function generateWebsite() {
    const teamMembers = await promptUser();
    const htmlContent = render(teamMembers);
    fs.writeFileSync(outputPath, htmlContent, 'utf-8');
    console.log('Team website generated! Check the output folder for team.html');
}

generateWebsite().catch(err => console.error(err));
