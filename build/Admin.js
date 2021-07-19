"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const AppointmentFactory_1 = require("./AppointmentFactory");
const VaccApp_1 = require("./VaccApp");
class Admin {
    static _instance = new Admin();
    constructor() {
        if (Admin._instance)
            throw new Error("Use Admin.getInstance() instead new Admin()");
        Admin._instance = this;
    }
    static getInstance() {
        return Admin._instance;
    }
    async login() {
        let username = await ConsoleHandling_1.default.question("Username: ");
        if (username == "admin") {
            let password = await ConsoleHandling_1.default.question("password: ");
            if (password == "1234") {
                ConsoleHandling_1.default.printInput("\nHello admin! Nice to see you :)");
                this.showMethods();
            }
            else {
                ConsoleHandling_1.default.printInput("\nincorrect Password. Please try again");
                this.login();
            }
        }
        else {
            ConsoleHandling_1.default.printInput("\nincorrect Username. Please try again");
            this.login();
        }
    }
    async showMethods() {
        let answer;
        answer = await ConsoleHandling_1.default.showPossibilities(["(1) Create appointments", "(2) Overview for a day", "(3) Statistics"], "Please type the number of the function you want to use.");
        while (answer != "1" && answer != "2" && answer != "3") {
            ConsoleHandling_1.default.printInput("\nThis is not a valif input! Please try again.");
            answer = await ConsoleHandling_1.default.showPossibilities(["(1) Create appointments", "(2) Overview for a day", "(3) Statistics"], "Please type the number of the function you want to use.");
        }
        switch (answer) {
            case "1":
                AppointmentFactory_1.AppointmentFactory.getInstance().createAppointments();
                break;
            case "2":
                this.showDayOverview();
                break;
            case "3":
                this.showStatistics();
        }
    }
    async showDayOverview() {
        let amountOfAvailableAppointments = 0;
        let amountOfOccupiedAppointments = 0;
        let amountOfAppointments = 0;
        let occupancyInPercent = 0;
        let availabilityInPercent = 0;
        let appointmentIsAvailable = false;
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    amountOfAppointments++;
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                    else
                        (amountOfOccupiedAppointments++);
                });
            });
        });
        availabilityInPercent = (amountOfAvailableAppointments / amountOfAppointments) * 100;
        occupancyInPercent = (amountOfOccupiedAppointments / amountOfAppointments) * 100;
        ConsoleHandling_1.default.printInput("\nAppointments available: " + availabilityInPercent.toString().substring(0, 4) + "%");
        ConsoleHandling_1.default.printInput("Appointments occupied: " + occupancyInPercent.toString().substring(0, 4) + "%");
        appointmentsArray.forEach(day => {
            ConsoleHandling_1.default.printInput("\n" + day.date + "\n");
            day.parallelAppointmentInterval.forEach(interval => {
                amountOfAvailableAppointments = 0;
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true) {
                        amountOfAvailableAppointments++;
                        appointmentIsAvailable = true;
                    }
                });
                if (appointmentIsAvailable)
                    ConsoleHandling_1.default.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
                else
                    ConsoleHandling_1.default.printInput(day.date + " (100% belegt)");
            });
        });
        this.goNext();
    }
    async showStatistics() {
        let appointmentsArray = await FileHandling_1.default.readArrayFile("/data/appointments.json");
        let dayOfToday = new Date().toJSON().substring(8, 10);
        let monthOfToday = new Date().toJSON().substring(5, 7);
        let yearOfToday = parseInt(new Date().toJSON());
        let totalAppointments = 0;
        let totalAvailableAppointments = 0;
        let totalOccupiedAppointments = 0;
        let pastAppointments = 0;
        let pastAvailableAppointments = 0;
        let pastOccupiedAppointments = 0;
        let futureAppointments = 0;
        let futureAvailableAppointments = 0;
        let futureOccupiedAppointments = 0;
        appointmentsArray.forEach(day => {
            let thisDay = parseInt(day.date.substring(0, 3));
            let thisMonth = parseInt(day.date.substring(4, 6));
            let thisYear = parseInt(day.date.substring(6, 10));
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    totalAppointments++;
                    if (appointment.isAvailable == true) {
                        totalAvailableAppointments++;
                        if (thisYear < yearOfToday) {
                            pastAvailableAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth <= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay <= parseInt(dayOfToday)) {
                                pastAvailableAppointments++;
                                pastAppointments++;
                            }
                        if (thisMonth < parseInt(monthOfToday)) {
                            pastAvailableAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear > yearOfToday) {
                            futureAvailableAppointments++;
                            futureAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth >= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay > parseInt(dayOfToday)) {
                                futureAvailableAppointments++;
                                futureAppointments++;
                            }
                        if (thisMonth > parseInt(monthOfToday)) {
                            futureAvailableAppointments++;
                            futureAppointments++;
                        }
                    }
                    else {
                        totalOccupiedAppointments++;
                        if (thisYear < yearOfToday) {
                            pastOccupiedAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth <= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay <= parseInt(dayOfToday)) {
                                pastOccupiedAppointments++;
                                pastAppointments++;
                            }
                        if (thisMonth < parseInt(monthOfToday)) {
                            pastOccupiedAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear > yearOfToday) {
                            futureOccupiedAppointments++;
                            futureAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth >= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay > parseInt(dayOfToday)) {
                                futureOccupiedAppointments++;
                                futureAppointments++;
                            }
                        if (thisMonth > parseInt(monthOfToday)) {
                            futureOccupiedAppointments++;
                            futureAppointments++;
                        }
                    }
                });
            });
        });
        ConsoleHandling_1.default.printInput("Total Appointments: " + totalAppointments.toString());
        ConsoleHandling_1.default.printInput("  - in the future: " + futureAppointments);
        ConsoleHandling_1.default.printInput("  - in the past: " + pastAppointments);
        ConsoleHandling_1.default.printInput("Available Appointments: " + totalAvailableAppointments.toString());
        ConsoleHandling_1.default.printInput("  - in the future: " + futureAvailableAppointments.toString());
        ConsoleHandling_1.default.printInput("  - in the past: " + pastAvailableAppointments.toString());
        ConsoleHandling_1.default.printInput("Occupied Appointments: " + totalOccupiedAppointments.toString());
        ConsoleHandling_1.default.printInput("  - in the future: " + futureOccupiedAppointments.toString());
        ConsoleHandling_1.default.printInput("  - in the past: " + pastOccupiedAppointments.toString());
        this.goNext();
    }
    async goNext() {
        let goNext;
        goNext = await ConsoleHandling_1.default.showPossibilities(["(1) back to admin menu", "(2) logout", "(3) close console"], "Please type in the number of the function you want to use: ");
        while (goNext != "1" && goNext != "2" && goNext != "3") {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please try again.");
            goNext = await ConsoleHandling_1.default.showPossibilities(["(1) back to admin menu", "(2) logout", "(3) close console"], "Please type in the number of the function you want to use: ");
        }
        switch (goNext) {
            case "1":
                this.showMethods();
                break;
            case "2":
                VaccApp_1.default.chooseRole();
                break;
            case "3":
                ConsoleHandling_1.default.closeConsole();
        }
    }
}
exports.Admin = Admin;
exports.default = Admin.getInstance();
//# sourceMappingURL=Admin.js.map