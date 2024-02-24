// Functions for generating individual employee cards
const generateManager = manager => {
    return `
    <div class="card employee-card shadow mb-5 m-3">
    <div class="card-header bg-primary">
        <h2 class="card-title text-white">${manager.getName()}</h2>
        <h3 class="card-title text-white"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
    </div>
    <div class="card-body bg-light">
        <ul class="list-group">
            <li class="list-group-item">ID: ${manager.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
            <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
        </ul>
    </div>
</div>
    `;
};

const generateEngineer = engineer => {
    return `
    <div class="card employee-card shadow mb-5 m-3">
        <div class="card-header bg-primary">
            <h2 class="card-title text-white">${engineer.getName()}</h2>
            <h3 class="card-title text-white"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
        </div>
        <div class="card-body bg-light">
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineer.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
            </ul>
        </div>
    </div>
    `;
};

const generateIntern = intern => {
    return `
    <div class="card employee-card shadow mb-5 m-3">
        <div class="card-header bg-primary">
            <h2 class="card-title text-white">${intern.getName()}</h2>
            <h3 class="card-title text-white"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
        </div>
        <div class="card-body bg-light">
            <ul class="list-group">
                <li class="list-group-item">ID: ${intern.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-group-item">School: ${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
    `;
};

// Function to create the team with rows containing a max of 3 elements
const generateTeam = team => {
    // Helper function to create rows with a max of 3 cards per row
    const generateRow = teamMembers => {
        let rowsHtml = '';
        for (let i = 0; i < teamMembers.length; i += 3) {
            let end = i + 3 < teamMembers.length ? i + 3 : teamMembers.length;
            let rowMembers = teamMembers.slice(i, end);
            rowsHtml += `
<div class="row">
    <div class="team-area col-12 d-flex justify-content-center">
        ${rowMembers.join('')}
    </div>    
</div>`;
        }
        return rowsHtml;
    };

    // Generate HTML for all roles and combine them into rows
    let allMembersHtml = [
        ...team.filter(employee => employee.getRole() === "Manager").map(manager => generateManager(manager)),
        ...team.filter(employee => employee.getRole() === "Engineer").map(engineer => generateEngineer(engineer)),
        ...team.filter(employee => employee.getRole() === "Intern").map(intern => generateIntern(intern))
    ];

    return generateRow(allMembersHtml);
}

// Export function to generate the entire page
export default function(team) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading bg-danger">
                <h1 class="text-center text-white">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        ${generateTeam(team)}
    </div>
</body>
</html>
    `;
};
