// Intern.js
import Employee from "./Employee.js";

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }

    get [Symbol.toStringTag]() {
        return `Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, School: ${this.school}, Role: ${this.getRole()}`;
    }
}

export default Intern;
