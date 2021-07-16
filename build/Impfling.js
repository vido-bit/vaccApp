"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impfling = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const RegisteredImpfling_1 = require("./RegisteredImpfling");
class Impfling {
    static _instance = new Impfling();
    _date;
    constructor() {
        if (Impfling._instance)
            throw new Error("Use Impfling.getInstance() instead new Impfling()");
        Impfling._instance = this;
    }
    static getInstance() {
        return Impfling._instance;
    }
    async createImpfling() {
        let impflingArray = FileHandling_1.default.readArrayFile("../data/appointments.json");
        let appointment;
        let firstName = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your firstname:");
        let lastName = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your lastname:");
        // let birthdayString: string = await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
        // let birthday: Date = new Date(birthdayString);
        let birthday = await (await this.enterBirthday());
        let phoneNumber = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your phone number:");
        let street = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the street you live in:");
        let houseNumberString = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your house number:");
        let houseNumber = parseInt(houseNumberString);
        let postCodeString = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the postcode of your location:");
        let postCode = parseFloat(postCodeString);
        let city = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the city you live in:");
        let eMail; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, impflingArray)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Email");
        }
        let registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(appointment, firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
        impflingArray.push(registeredImpfling);
        FileHandling_1.default.writeFile("../data/appointments.json", impflingArray);
    }
    async enterBirthday() {
        let birthday;
        try {
            let birthdayString = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
            birthday = new Date(birthdayString);
            return birthday;
        }
        catch (e) {
            console.log("wrong Date format"); //, await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd-mm-yyyy:")
            return this.enterBirthday();
        }
    }
    showDayswithFreeAppointments() {
    }
    searchSpecificDay() {
    }
    searchForASpecificDay(_date) {
    }
    async registerInWaitingList() {
        let waitingList = FileHandling_1.default.readArrayFile("../data/waitingList.json");
        let appointment;
        let firstName = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your firstname:");
        let lastName = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your lastname:");
        let birthday = await (await this.enterBirthday());
        let phoneNumber = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your phone number:");
        let street = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the street you live in:");
        let houseNumberString = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in your house number:");
        let houseNumber = parseInt(houseNumberString);
        let postCodeString = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the postcode of your location:");
        let postCode = parseFloat(postCodeString);
        let city = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the city you live in:");
        let eMail; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, waitingList)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Email");
        }
        let registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(appointment, firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
        waitingList.push(registeredImpfling);
        FileHandling_1.default.writeFile("../data/waitingList.json", waitingList);
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