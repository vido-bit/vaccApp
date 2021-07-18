"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impfling = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const RegisteredImpfling_1 = require("./RegisteredImpfling");
const Validator_1 = require("./Validator");
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
    async showMethods() {
        let answer;
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        let amountOfAvailableAppointments = 0;
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                });
            });
        });
        ConsoleHandling_1.default.printInput("methode // showMethods");
        if (amountOfAvailableAppointments > 0) {
            answer = await ConsoleHandling_1.default.showPossibilities(["(1) Show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
            while (answer != "1" && answer != "2") {
                ConsoleHandling_1.default.printInput("\nThis was not a valid input! Please try again.");
                answer = await ConsoleHandling_1.default.showPossibilities(["(1) Show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
            }
            switch (answer) {
                case "1":
                    this.showDayswithFreeAppointments();
                    break;
                case "2":
                    this.searchSpecificDay();
                    break;
            }
        }
        else {
            answer = await ConsoleHandling_1.default.showPossibilities(["Unfortunately there are no free appointments available at this Moment. Would you like to register in waiting list?"], "y/n)");
            switch (answer) {
                case "y":
                    this.registerInWaitingList();
                    break;
                case "n":
                    ConsoleHandling_1.default.closeConsole();
                    break;
            }
        }
    }
    async showDayswithFreeAppointments() {
        let alreadyRegistered = false;
        let dateExists = false;
        let timeExists = false;
        let waitingList = FileHandling_1.default.readArrayFile("/data/waitingList.json");
        let amountOfAvailableAppointments;
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        appointmentsArray.forEach(day => {
            ConsoleHandling_1.default.printInput("\n" + day.date + "\n");
            day.parallelAppointmentInterval.forEach(interval => {
                amountOfAvailableAppointments = 0;
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true) {
                        amountOfAvailableAppointments++;
                    }
                });
                ConsoleHandling_1.default.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
            });
        });
        let inputDate = await ConsoleHandling_1.default.question("Please type in the date of the appointment you want to register for: ");
        appointmentsArray.forEach(day => {
            if (day.date == inputDate)
                dateExists = true;
        });
        while (!Validator_1.default.isValidDate(inputDate) || !dateExists) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            inputDate = await ConsoleHandling_1.default.question("Please type in the date of the appointment you want to register for: ");
        }
        let inputTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                if (interval.startTime == inputTime)
                    timeExists = true;
            });
        });
        while (!Validator_1.default.isValidTime(inputTime) || !timeExists) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid time! Please use format hh:mm.");
            inputDate = await ConsoleHandling_1.default.question("Please type in the date of the appointment you want to register for: ");
        }
        let firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
        while (!Validator_1.default.isValidWord(firstName)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
        }
        let lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
        while (!Validator_1.default.isValidWord(firstName)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
        }
        let birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
        while (!Validator_1.default.isValidDate(birthday)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
        }
        let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
        while (!Validator_1.default.isValidNumber(phoneNumber)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
            phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
        }
        let street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
        while (!Validator_1.default.isValidWord(street)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
        }
        let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
        while (!Validator_1.default.isValidNumber(houseNumber)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
            houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
        }
        let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
        while (!Validator_1.default.isValidNumber(postCode)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid postcode!");
            postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
        }
        let city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
        while (!Validator_1.default.isValidWord(city)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
        }
        let eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
        while (!Validator_1.default.isValidEmail(eMail) || Validator_1.default.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid e-mail! Please try again.");
            eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
        }
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                        //  choseAppointment = true;
                        // ConsoleHandling.printInput(day.date, interval.startTime);
                        // ConsoleHandling.printInput(inputDate, inputTime);
                        appointment.registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                        appointment.isAvailable = false;
                        alreadyRegistered = true;
                    }
                });
            });
        });
        FileHandling_1.default.writeFile("/data/appointments.json", appointmentsArray);
    }
    async searchSpecificDay() {
        let alreadyRegistered = false;
        let dateAvailable = false;
        let timeAvailable = false;
        let amountOfAvailableAppointments;
        let registeredImpfling;
        let waitingList = FileHandling_1.default.readArrayFile("/data/waitingList.json");
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        let inputTime;
        let inputDate = await ConsoleHandling_1.default.question("Please type in the date to find appointments:");
        while (!Validator_1.default.isValidDate(inputDate)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.m.yyyy.");
            inputDate = await ConsoleHandling_1.default.question("Please type in the date to find appointments:");
        }
        appointmentsArray.forEach(day => {
            if (!dateAvailable) {
                if (inputDate == day.date) {
                    dateAvailable = true;
                    day.parallelAppointmentInterval.forEach(interval => {
                        amountOfAvailableAppointments = 0;
                        interval.parallelAppointments.forEach(appointment => {
                            if (appointment.isAvailable == true)
                                amountOfAvailableAppointments++;
                        });
                        ConsoleHandling_1.default.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
                    });
                }
            }
        });
        if (dateAvailable) {
            inputTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
            while (!Validator_1.default.isValidTime(inputTime)) {
                ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please use format hh:mm.");
                inputTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
            }
            appointmentsArray.forEach(day => {
                day.parallelAppointmentInterval.forEach(interval => {
                    interval.parallelAppointments.forEach(appointment => {
                        registeredImpfling = appointment.registeredImpfling;
                        if (appointment.isAvailable == true && day.date == inputDate && inputTime == interval.startTime) {
                            timeAvailable = true;
                        }
                    });
                });
            });
            if (timeAvailable) {
                let firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
                while (!Validator_1.default.isValidWord(firstName)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
                }
                let lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
                while (!Validator_1.default.isValidWord(firstName)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
                }
                let birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
                while (!Validator_1.default.isValidDate(birthday)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
                    birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
                }
                let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
                while (!Validator_1.default.isValidNumber(phoneNumber)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
                    phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
                }
                let street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
                while (!Validator_1.default.isValidWord(street)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
                }
                let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
                while (!Validator_1.default.isValidNumber(houseNumber)) {
                    ConsoleHandling_1.default.printInput("v\nThis is not a valid number!");
                    houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
                }
                let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
                while (!Validator_1.default.isValidNumber(postCode)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid postcode!");
                    postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
                }
                let city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
                while (!Validator_1.default.isValidWord(city)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
                }
                let eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
                while (!Validator_1.default.isValidEmail(eMail) || Validator_1.default.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
                    ConsoleHandling_1.default.printInput("\nThis is not a valid e-mail! Please try again.");
                    eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
                }
                appointmentsArray.forEach(day => {
                    day.parallelAppointmentInterval.forEach(interval => {
                        interval.parallelAppointments.forEach(appointment => {
                            if (appointment.isAvailable == true && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                                appointment.registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                                appointment.isAvailable = false;
                                alreadyRegistered = true;
                            }
                        });
                    });
                });
            }
            else {
                let answer = await ConsoleHandling_1.default.showPossibilities(["Sorry, this time is not available.", "(1) try again", "(2) search for another day", "(3) go back to menu"], "Please type in the numbers of the function you want to use.");
                switch (answer) {
                    case "1":
                        inputTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
                        appointmentsArray.forEach(day => {
                            day.parallelAppointmentInterval.forEach(interval => {
                                if (inputTime == interval.startTime)
                                    timeAvailable = true;
                            });
                        });
                        if (timeAvailable) {
                            let firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
                            while (!Validator_1.default.isValidWord(firstName)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
                            }
                            let lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
                            while (!Validator_1.default.isValidWord(firstName)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
                            }
                            let birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
                            while (!Validator_1.default.isValidDate(birthday)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
                                birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
                            }
                            let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
                            while (!Validator_1.default.isValidNumber(phoneNumber)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
                                phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
                            }
                            let street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
                            while (!Validator_1.default.isValidWord(street)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
                            }
                            let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
                            while (!Validator_1.default.isValidNumber(houseNumber)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
                                houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
                            }
                            let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
                            while (!Validator_1.default.isValidNumber(postCode)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid postcode!");
                                postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
                            }
                            let city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
                            while (!Validator_1.default.isValidWord(city)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
                            }
                            let eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
                            while (!Validator_1.default.isValidEmail(eMail) || Validator_1.default.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
                                ConsoleHandling_1.default.printInput("\nThis is not a valid e-mail! Please try again.");
                                eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
                            }
                            ConsoleHandling_1.default.printInput("Hallo");
                            appointmentsArray.forEach(day => {
                                ConsoleHandling_1.default.printInput("Hihi");
                                day.parallelAppointmentInterval.forEach(interval => {
                                    interval.parallelAppointments.forEach(appointment => {
                                        if (appointment.isAvailable == true && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                                            appointment.registeredImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                                            appointment.isAvailable = false;
                                            alreadyRegistered = true;
                                        }
                                    });
                                });
                            });
                        }
                        else {
                            ConsoleHandling_1.default.printInput("Sorry, you repeatedly typed in a time which not exists. Please continue by searching the day.");
                            this.searchSpecificDay();
                        }
                        break;
                    case "2":
                        this.searchSpecificDay();
                        break;
                    case "3":
                        this.showMethods();
                        break;
                }
            }
            FileHandling_1.default.writeFile("/data/appointments.json", appointmentsArray);
            ConsoleHandling_1.default.printInput("Congratulations! You successfully registered for an appointment on " + inputDate + " at " + inputTime);
            this.showMethods();
        }
        else {
            ConsoleHandling_1.default.printInput("\nUnfortunately there are no appointments available on this date.\n");
            this.searchSpecificDay();
        }
    }
    async registerInWaitingList() {
        ConsoleHandling_1.default.printInput("~register for waiting list~");
        try {
            FileHandling_1.default.readArrayFile("/data/appointments.json");
        }
        catch (error) {
            FileHandling_1.default.writeFile("/data/appointments.json", []);
        }
        try {
            FileHandling_1.default.readArrayFile("/data/waitingList.json");
        }
        catch (error) {
            FileHandling_1.default.writeFile("/data/waitingList.json", []);
        }
        let waitingList = FileHandling_1.default.readArrayFile("/data/waitingList.json");
        let appointmentsArray = FileHandling_1.default.readArrayFile("/data/appointments.json");
        let firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
        while (!Validator_1.default.isValidWord(firstName)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            firstName = await ConsoleHandling_1.default.question("Please type in your firstname: ");
        }
        let lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
        while (!Validator_1.default.isValidWord(firstName)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            lastName = await ConsoleHandling_1.default.question("Please type in your lastname: ");
        }
        let birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
        while (!Validator_1.default.isValidDate(birthday)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            birthday = await ConsoleHandling_1.default.question("Please type in your Birthday Date: ");
        }
        let phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
        while (!Validator_1.default.isValidNumber(phoneNumber)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
            phoneNumber = await ConsoleHandling_1.default.question("Please type in your phone number: ");
        }
        let street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
        while (!Validator_1.default.isValidWord(street)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            street = await ConsoleHandling_1.default.question("Please type in the street you live in: ");
        }
        let houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
        while (!Validator_1.default.isValidNumber(houseNumber)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number!");
            houseNumber = await ConsoleHandling_1.default.question("Please type in your house number: ");
        }
        let postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
        while (!Validator_1.default.isValidNumber(postCode)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid postcode!");
            postCode = await ConsoleHandling_1.default.question("Please type in the postcode of your location: ");
        }
        let city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
        while (!Validator_1.default.isValidWord(city)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            city = await ConsoleHandling_1.default.question("Please type in the city you live in: ");
        }
        let eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
        while (!Validator_1.default.isValidEmail(eMail) || Validator_1.default.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid e-mail! Please try again.");
            eMail = await ConsoleHandling_1.default.question("Please type in your email Address: ");
        }
        let waitingImpfling = new RegisteredImpfling_1.RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
        waitingList.push(waitingImpfling);
        FileHandling_1.default.writeFile("/data/waitingList.json", waitingList);
        ConsoleHandling_1.default.printInput("\nCongratulations! You successfully registered yourself on the waiting list.");
        let closeConsole;
        closeConsole = await ConsoleHandling_1.default.question("Press (x) to close console.");
        while (closeConsole != "x") {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input!");
            closeConsole = await ConsoleHandling_1.default.question("Press (x) to close console.");
        }
        if (closeConsole == "x")
            ConsoleHandling_1.default.closeConsole();
    }
}
exports.Impfling = Impfling;
//# sourceMappingURL=Impfling.js.map