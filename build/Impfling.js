"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impfling = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const RegisteredImpfling_1 = require("./RegisteredImpfling");
class Impfling {
    static _instance = new Impfling();
    constructor() {
        if (Impfling._instance)
            throw new Error("Use Impfling.getInstance() instead new Impfling()");
        Impfling._instance = this;
    }
    static getInstance() {
        return Impfling._instance;
    }
    async createImpfling() {
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        // appointmentsArray.forEach(day => {
        //     day.parallelAppointmentInterval.forEach(interval => {
        //         interval.parallelAppointments.forEach(appointment => {
        //       appointment.registeredImpfling
        //         });
        //     });
        // });
        let appointment;
        let firstName = await ConsoleHandling_1.default.question("Please type in your firstname:");
        let lastName = await ConsoleHandling_1.default.question("Please type in your lastname:");
        // let birthdayString: string = await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
        // let birthday: Date = new Date(birthdayString);
        // let birthday: Date = await (await this.enterBirthday());
        let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number:");
        let street = await ConsoleHandling_1.default.question("Please type in the street you live in:");
        let houseNumberString = await ConsoleHandling_1.default.getInstance().question("Please type in your house number:");
        let houseNumber = parseInt(houseNumberString);
        let postCodeString = await ConsoleHandling_1.default.question("Please type in the postcode of your location:");
        let postCode = parseFloat(postCodeString);
        let city = await ConsoleHandling_1.default.question("Please type in the city you live in:");
        let eMail; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, impflingArray)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling_1.default.question("Email");
        }
        let registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(appointment, firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
        // impflingArray.push(registeredImpfling);
        // FileHandling.writeFile("../data/appointments.json", impflingArray);
    }
    // public async enterBirthday(): Promise<Date> {
    //     let birthday: Date;
    //     try {
    //         let birthdayString: string = await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
    //         birthday = new Date(birthdayString);
    //         return birthday;
    //     } catch (e) {
    //         console.log("wrong Date format"); //, await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd-mm-yyyy:")
    //         return this.enterBirthday();
    //     }
    // }
    async showDayswithFreeAppointments() {
        let alreadyRegistered;
        let choseAppointment;
        let amountOfAvailableAppointments;
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        appointmentsArray.forEach(day => {
            ConsoleHandling_1.default.printInput(day.date);
            day.parallelAppointmentInterval.forEach(interval => {
                amountOfAvailableAppointments = 0;
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                });
                ConsoleHandling_1.default.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
            });
        });
        let inputDate = await ConsoleHandling_1.default.question("Please type in the date of the appointment you want to register for:");
        let inputTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
        let firstName = await ConsoleHandling_1.default.question("Please type in your firstname:");
        let lastName = await ConsoleHandling_1.default.question("Please type in your lastname:");
        let birthday = await ConsoleHandling_1.default.question("Please type in your birthday date (use format dd.mm.yyyy or dd-mm-yyyy):");
        let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number:");
        let street = await ConsoleHandling_1.default.question("Please type in the street you live in:");
        let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number:");
        let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location:");
        let city = await ConsoleHandling_1.default.question("Please type in the city you live in:");
        let eMail = await ConsoleHandling_1.default.question("Email");
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                        choseAppointment = true;
                        // console.log(day.date, interval.startTime);
                        // console.log(inputDate, inputTime);
                        appointment.registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                        appointment.isAvailable = false;
                        alreadyRegistered = true;
                    }
                });
            });
        });
        FileHandling_1.default.writeFile("/data/appointments.json", appointmentsArray);
        // while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, impflingArray)) {
        //     console.log("This is not a valid e-mail");
        //     eMail = await ConsoleHandling.question("Email");
        //}
    }
    searchSpecificDay() {
    }
    searchForASpecificDay(_date) {
    }
    async registerInWaitingList() {
        let waitingList = FileHandling_1.default.readArrayFile("/data/waitingList.json");
        let firstName = await ConsoleHandling_1.default.question("Please type in your firstname:");
        let lastName = await ConsoleHandling_1.default.question("Please type in your lastname:");
        let birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date");
        let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number:");
        let street = await ConsoleHandling_1.default.question("Please type in the street you live in:");
        let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number:");
        let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location:");
        let city = await ConsoleHandling_1.default.question("Please type in the city you live in:");
        let eMail; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, waitingList)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling_1.default.question("Email");
        }
        let registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
        waitingList.push(registeredImpfling);
        FileHandling_1.default.writeFile("/data/waitingList.json", waitingList);
    }
    isValidEmail(_eMail) {
        let regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
        return regex.test(_eMail);
    }
    emailAlreadyExists(_eMail, impflingArray) {
        for (let impfling of impflingArray) {
            if (impfling._eMail == _eMail) {
                return true;
            }
        }
        return false;
    }
}
exports.Impfling = Impfling;
//# sourceMappingURL=Impfling.js.map