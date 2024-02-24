// Engineer.js
import Employee from "./Employee.js";
//import Intern from "./Intern";

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }

    get [Symbol.toStringTag]() {
        return `Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, GitHub: ${this.github}, Role: ${this.getRole()}`;
    }
}

export default Engineer;
