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
    const roleChoices = [
        { name: 'Engineer', value: 'Engineer' },
        { name: 'Manager', value: 'Manager' },
        { name: 'Intern', value: 'Intern' }
    ];

    const { role } = await inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleChoices
        }
    ]);

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: `What is the ${role}'s name?`
        },
        {
            type: 'input',
            name: 'id',
            message: `What is the ${role}'s id?`
        },
        {
            type: 'input',
            name: 'email',
            message: `What is the ${role}'s email?`
        }
    ];

    if (role === 'Manager') {
        questions.push({
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?"
        });
    } else if (role === 'Engineer') {
        questions.push({
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        });
    } else if (role === 'Intern') {
        questions.push({
            type: 'input',
            name: 'school',
            message: "What is the intern's school?"
        });
    }

    const answers = await inquirer.prompt(questions);

    if (role === 'Manager') {
        return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    } else if (role === 'Engineer') {
        return new Engineer(answers.name, answers.id, answers.email, answers.github);
    } else if (role === 'Intern') {
        return new Intern(answers.name, answers.id, answers.email, answers.school);
    }
}

async function promptUsers() {
    let teamMembers = [];
    let exit = false;

    do {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: 'Check employees', value: 'check' },
                    { name: 'Add employee', value: 'add' },
                    { name: 'Exit app', value: 'exit' }
                ]
            }
        ]);

        switch (action) {
            case 'check':
                console.log('Current Team Members:', teamMembers);
                break;
            case 'add':
                const newMember = await promptUser();
                teamMembers.push(newMember);
                break;
            case 'exit':
                exit = true;
                break;
            default:
                console.log('Invalid action selected.');
        }
    } while (!exit);

    return teamMembers;
}

function staticUsers(){
    let teamMembers = [];
    let manager = new Manager("Jared","MA00001","manager@gmail.com","34RSW233");
    let engineer1 = new Engineer("Alec","EN00001","engineer1@gmail.com","@engineer1");
    let engineer2 = new Engineer("Grace","EN00002","engineer2@gmail.com","@engineer2");
    let engineer3 = new Engineer("Tammer","EN00003","engineer3@gmail.com","@engineer3");
    let intern1 = new Intern("Peter","IN00001","intern1@gmail.com","UCL");
    teamMembers.push(manager);
    teamMembers.push(engineer1);
    teamMembers.push(engineer2);
    teamMembers.push(engineer3);
    teamMembers.push(intern1);
    return teamMembers
}

// Function to generate and write HTML file
async function generateWebsite(teamMembers) {
    console.log(`teamMembers: ${JSON.stringify(teamMembers, null, 2)}`);
    const htmlContent = render(teamMembers);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(outputPath, htmlContent, 'utf-8');
    console.log('Team website generated! Check the output folder for team.html');
}

/**
 * Main function to decide which function to call based on command-line arguments
 * and show usage if the wrong argument is provided
 */
async function main() {
    const validArgs = ['-s', '--sample'];
    const args = process.argv.slice(2); // Exclude the first two default arguments
    let teamMembers;

    // Check if any argument is provided and if it's valid
    if (args.length === 0) {
        teamMembers = await promptUsers();
    } else if (args.some(arg => validArgs.includes(arg))) {
        teamMembers = staticUsers();
    } else {
        // If an invalid argument is provided, show usage message and exit
        console.log("Invalid argument provided.");
        console.log("Usage: node index.js [-s | --sample]");
        console.log("       -s, --sample   Use sample team members instead of prompting for input");
        return;
    }
    await generateWebsite(teamMembers).catch(err => console.error(err));
}

main(); // Call the main function
