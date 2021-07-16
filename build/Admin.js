"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const AppointmentFactory_1 = require("./AppointmentFactory");
class Admin {
    static _instance = new Admin();
    _username;
    _password;
    constructor() {
        if (Admin._instance)
            throw new Error("Use Admin.getInstance() instead new Admin()");
        Admin._instance = this;
    }
    static getInstance() {
        return Admin._instance;
    }
    login() {
        let appointmentFactory = new AppointmentFactory_1.AppointmentFactory();
        appointmentFactory.createAppointment();
    }
    passwordEntry(_username, _password) {
    }
    // private async createAppointments(): Promise<void> {
    // let appointmentArray: Array<AppointmentDay> = FileHandling.readArrayFile("../data/appointments.json");
    // let appointmentDay: string = await ConsoleHandling.getInstance().question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
    // let startTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to start (use format 00:00):");
    // let endTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to end (use format 00:00):");
    // let parallelVaccination: string = await ConsoleHandling.getInstance().question("Please type in the Number of Vaccinations you want to be carried out parallel:");
    // let timeIntervalInMinutes: string = await ConsoleHandling.getInstance().question("Please type in the time in Minutes one vaccination needs to be carried out:");
    // let endHours: string = endTime.substring(0, 1);
    // let endMinutes: string = endTime.substring(3, 4);
    // let startHours: string = startTime.substring(0, 1);
    // let startMinutes: string = startTime.substring(3, 4);
    // let hourDifference: number = parseInt(endHours) - parseInt(startHours);
    // let minutesDifference: number = parseInt(endHours) - parseInt(startHours);
    // let hoursInMinutes: number = hourDifference * 60;
    // let timeForAppointmentsInMinutes: number = hoursInMinutes + minutesDifference;
    // let appointmentsForThisDay: Number = Math.floor(parseInt(timeIntervalInMinutes) / timeForAppointmentsInMinutes);
    // let newParallelVaccinations: ParallelVaccinations[];
    // for (let i: number = 0; i < appointmentsForThisDay; i++) {
    //     newParallelVaccinations = new ParallelVaccinations(startTime, endTime, i);
    // }
    // let newAppointmentDay: AppointmentDay = new AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccination), parseInt(timeIntervalInMinutes), newParallelVaccinations);
    // }
    async showDayOverview() {
        //     let date: string = await ConsoleHandling.getInstance().question("Please type in the day you want to an overview for (use format dd-mm-yyyy):");
        // let overview: dayOverview = new dayOverview(date);
    }
    async showStatistics() {
    }
}
exports.Admin = Admin;
exports.default = Admin.getInstance();
//# sourceMappingURL=Admin.js.map