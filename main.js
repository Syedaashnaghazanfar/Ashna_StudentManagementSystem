#! /usr/bin/env node
import { input, number, select } from "@inquirer/prompts";
import chalk from "chalk";
console.log(chalk.green.bold("    _****_   Syeda Ashna === Student Management System   _****_    "));
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    // using constructor for initializing values
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000; //by default
    }
    // USING METHODS
    // method for enrolling courses and adding into array
    enroll_courses(course) {
        this.courses.push(course);
    }
    // method for viewing balance of student
    view_balance() {
        console.log(chalk.red(` ${this.name} has balance : ${chalk.green("$" + this.balance)}`));
    }
    //method for paying tution fees
    pay_fees(fees) {
        this.balance -= fees;
        console.log(chalk.red(`${this.name} fees is paid!, Remaining balance : ${chalk.green("$" + this.balance)}`));
    }
    //method to show student status
    show_status() {
        chalk.blue.italic;
        {
            console.log(`ID : ${this.id}`);
            console.log(`Student Name : ${this.name}`);
            console.log(`Courses : ${this.courses}`);
            console.log(`Balance : ${this.balance}`);
        }
    }
}
//making new class for inheriting properting
class students_manager {
    students;
    static add_students;
    constructor() {
        this.students = [];
    }
    //inheriting parent properties into child properties
    //method for adding students
    add_students(NameOfStudent) {
        let addingStudents = new Student(NameOfStudent); // inherited  parent properties , now we have all parent features in child also
        this.students.push(addingStudents);
        console.log(chalk.red(`${NameOfStudent} added successfully!, student ID : ${addingStudents.id}`));
    }
    //method for enrolling students
    enrolled_students(studentID, course) {
        let foundStudents = this.students.find(std => std.id === studentID);
        if (foundStudents) {
            foundStudents.enroll_courses(course);
            console.log(`${studentID} enrolled in ${course} successfully!`);
        }
        else {
            console.log(chalk.red(`Cannot find ${studentID},try again!`));
        }
    }
    //method for viewing student balance
    viewing_students(studentID) {
        let foundStudents = this.students.find(std => std.id === studentID);
        if (foundStudents) {
            foundStudents.view_balance();
        }
        else {
            console.log(chalk.red(`Cannot find ${studentID},try again!`));
        }
    }
    //method for paying students fees
    paying_fees(studentID, fees) {
        let foundStudents = this.students.find(std => std.id === studentID);
        if (foundStudents) {
            foundStudents.pay_fees(fees);
        }
        else {
            console.log(chalk.red(`Cannot find ${studentID},try again!`));
        }
    }
    //method for showing student status
    show_status(studentID) {
        let foundStudents = this.students.find(std => std.id === studentID);
        if (foundStudents) {
            foundStudents.show_status();
        }
        else {
            console.log(chalk.red(`Cannot find ${studentID},try again!`));
        }
    }
}
// main function for the program
async function main() {
    console.log(chalk.green.bold("    _****_    Welcome to Syeda Ashna === Student Management System   _****_    "));
    console.log("_".repeat(70));
    let studentManager2 = new students_manager();
    while (true) {
        let message1 = await select({
            message: "Choose an option:",
            choices: [{ value: "Add Student" }, { value: "Enroll Student" }, { value: "View Student Balance" }, { value: "Pay Student Fees" }, { value: "Show Student Status" }, { value: "Exit" }],
        });
        console.log("_".repeat(70));
        if (message1 === "Add Student") {
            let name = await input({
                message: "Enter name you want to add",
            });
            studentManager2.add_students(name);
            console.log("_".repeat(70));
        }
        else if (message1 === "Enroll Student") {
            let idOfStudent = await number({
                message: "Enter student ID :",
            });
            let nameOfCourse = await input({
                message: "Enter the course you want to enroll in :",
            });
            studentManager2.enrolled_students(idOfStudent, nameOfCourse);
            console.log("_".repeat(70));
        }
        else if (message1 === "View Student Balance") {
            let idOfStudent = await number({
                message: "Enter student ID for viewing :",
            });
            studentManager2.viewing_students(idOfStudent);
            console.log("_".repeat(70));
        }
        else if (message1 === "Pay Student Fees") {
            let idOfStudent = await number({
                message: "Enter student ID for paying fees:",
            });
            let amount = await number({
                message: "Enter fees amount",
            });
            studentManager2.paying_fees(idOfStudent, amount);
            console.log("_".repeat(70));
        }
        else if (message1 === "Show Student Status") {
            let idOfStudent = await number({
                message: "Enter student ID to show status:",
            });
            studentManager2.show_status(idOfStudent);
            console.log("_".repeat(70));
        }
        else if (message1 === "Exit") {
            console.log(chalk.red("Exiting program..."));
            process.exit();
        }
    }
}
main();
