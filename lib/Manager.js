// Manager.js
import Employee from "./Employee.js";
import util from "util";

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    get [Symbol.toStringTag]() {
        return `Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, OfficeNumber: ${this.officeNumber}, Role: ${this.getRole()}`;
    }
}

export default Manager;