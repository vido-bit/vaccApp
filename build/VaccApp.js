"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccApp = void 0;
const Admin_1 = require("./Admin");
const Impfling_1 = require("./Impfling");
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
class VaccApp {
    static impfling;
    static admin;
    static _instance = new VaccApp();
    constructor() {
        if (VaccApp._instance)
            throw new Error("Use VaccApp.getInstance() instead new VaccApp");
        VaccApp._instance = this;
    }
    static getInstance() {
        return VaccApp._instance;
    }
    async chooseRole() {
        let answer;
        answer = await ConsoleHandling_1.ConsoleHandling.getInstance().showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use");
        switch (answer) {
            case "1":
                this.showMethods();
                break;
            case "2":
                Admin_1.Admin.getInstance().login();
                break;
        }
    }
    async showMethods() {
        // Admin.getInstance().login();
        let answer;
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        let amountOfAvailableAppointments = 0;
        console.log(appointmentsArray[0].parallelAppointmentInterval[0]);
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                });
            });
        });
        console.log("methode // showMethods");
        if (amountOfAvailableAppointments > 0) {
            answer = await ConsoleHandling_1.ConsoleHandling.getInstance().showPossibilities(["(1) show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
            switch (answer) {
                case "1":
                    Impfling_1.Impfling.getInstance().showDayswithFreeAppointments();
                    break;
                case "2":
                    Impfling_1.Impfling.getInstance().searchSpecificDay();
                    break;
            }
        }
        else {
            answer = await ConsoleHandling_1.ConsoleHandling.getInstance().showPossibilities(["Unfortunately there are no free appointments available at this Moment. Would you like to register in waiting list?"], "y/n)");
            switch (answer) {
                case "y":
                    Impfling_1.Impfling.getInstance().registerInWaitingList();
                    break;
                case "n":
                    ConsoleHandling_1.ConsoleHandling.getInstance().closeConsole();
                    break;
            }
        }
    }
}
exports.VaccApp = VaccApp;
exports.default = VaccApp.getInstance();
//# sourceMappingURL=VaccApp.js.map