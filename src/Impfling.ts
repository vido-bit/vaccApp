import { AppointmentDay } from "./AppointmentDay";
import ConsoleHandling from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import { RegisteredImpfling } from "./RegisteredImpfling";
import Validator from "./Validator";
export class Impfling {
    private static _instance: Impfling = new Impfling();
    public _date: string;
    private constructor() {
        if (Impfling._instance)
            throw new Error("Use Impfling.getInstance() instead new Impfling()");
        Impfling._instance = this;
    }
    public static getInstance(): Impfling {
        return Impfling._instance;
    }
    public async showMethods(): Promise<void> {

        let answer: string;
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");
        let amountOfAvailableAppointments: number = 0;
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                });
            });
        });
        ConsoleHandling.printInput("methode // showMethods");
        if (amountOfAvailableAppointments > 0) {
            answer = <string>await ConsoleHandling.showPossibilities(["(1) Show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
            while (answer != "1" && answer != "2") {
                ConsoleHandling.printInput("\nThis was not a valid input! Please try again.");
                answer = <string>await ConsoleHandling.showPossibilities(["(1) Show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
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
            answer = <string>await ConsoleHandling.showPossibilities(["Unfortunately there are no free appointments available at this Moment. Would you like to register in waiting list?"], "y/n)");
            switch (answer) {
                case "y":
                    this.registerInWaitingList();
                    break;
                case "n":
                    ConsoleHandling.closeConsole();
                    break;
            }
        }
    }
    public async showDayswithFreeAppointments(): Promise<void> {
        let alreadyRegistered: boolean = false;
        let dateExists: boolean = false;
        let timeExists: boolean = false;
        let waitingList: RegisteredImpfling[] = FileHandling.readArrayFile("/data/waitingList.json");
        let amountOfAvailableAppointments: number;
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");

        appointmentsArray.forEach(day => {
            ConsoleHandling.printInput("\n" + day.date + "\n");
            day.parallelAppointmentInterval.forEach(interval => {
                amountOfAvailableAppointments = 0;
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true) {
                        amountOfAvailableAppointments++;
                    }
                });
                ConsoleHandling.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
            });
        });
        let inputDate: string = await ConsoleHandling.question("Please type in the date of the appointment you want to register for: ");
        appointmentsArray.forEach(day => {
            if (day.date == inputDate)
                dateExists = true;
        });
        while (!Validator.isValidDate(inputDate) || !dateExists) {
            ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            inputDate = await ConsoleHandling.question("Please type in the date of the appointment you want to register for: ");
        }
        let inputTime: string = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                if (interval.startTime == inputTime)
                    timeExists = true;
            });
        });
        while (!Validator.isValidTime(inputTime) || !timeExists) {
            ConsoleHandling.printInput("\nThis is not a valid time! Please use format hh:mm.");
            inputDate = await ConsoleHandling.question("Please type in the date of the appointment you want to register for: ");
        }
        let firstName: string = await ConsoleHandling.question("Please type in your firstname: ");
        while (!Validator.isValidWord(firstName)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            firstName = await ConsoleHandling.question("Please type in your firstname: ");
        }
        let lastName: string = await ConsoleHandling.question("Please type in your lastname: ");
        while (!Validator.isValidWord(firstName)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            lastName = await ConsoleHandling.question("Please type in your lastname: ");
        }
        let birthday: string = await ConsoleHandling.question("Please type in your Birthday Date: ");
        while (!Validator.isValidDate(birthday)) {
            ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            birthday = await ConsoleHandling.question("Please type in your Birthday Date: ");
        }
        let phoneNumber: string = await ConsoleHandling.question("Please type in your phone number: ");
        while (!Validator.isValidNumber(phoneNumber)) {
            ConsoleHandling.printInput("\nThis is not a valid number!");
            phoneNumber = await ConsoleHandling.question("Please type in your phone number: ");
        }
        let street: string = await ConsoleHandling.question("Please type in the street you live in: ");
        while (!Validator.isValidWord(street)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            street = await ConsoleHandling.question("Please type in the street you live in: ");
        }
        let houseNumber: string = await ConsoleHandling.question("Please type in your house number: ");
        while (!Validator.isValidNumber(houseNumber)) {
            ConsoleHandling.printInput("\nThis is not a valid number!");
            houseNumber = await ConsoleHandling.question("Please type in your house number: ");
        }
        let postCode: string = await ConsoleHandling.question("Please type in the postcode of your location: ");
        while (!Validator.isValidNumber(postCode)) {
            ConsoleHandling.printInput("\nThis is not a valid postcode!");
            postCode = await ConsoleHandling.question("Please type in the postcode of your location: ");
        }
        let city: string = await ConsoleHandling.question("Please type in the city you live in: ");
        while (!Validator.isValidWord(city)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            city = await ConsoleHandling.question("Please type in the city you live in: ");
        }
        let eMail: string = await ConsoleHandling.question("Please type in your email Address: ");
        while (!Validator.isValidEmail(eMail) || Validator.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
            ConsoleHandling.printInput("\nThis is not a valid e-mail! Please try again.");
            eMail = await ConsoleHandling.question("Please type in your email Address: ");
        }
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                        //  choseAppointment = true;
                        // ConsoleHandling.printInput(day.date, interval.startTime);
                        // ConsoleHandling.printInput(inputDate, inputTime);
                        appointment.registeredImpfling = new RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                        appointment.isAvailable = false;
                        alreadyRegistered = true;
                    }
                });
            });
        });
        FileHandling.writeFile("/data/appointments.json", appointmentsArray);
    }
    public async searchSpecificDay(): Promise<void> {
        let alreadyRegistered: boolean = false;
        let dateAvailable: boolean = false;
        let timeAvailable: boolean = false;
        let amountOfAvailableAppointments: number;
        let registeredImpfling: RegisteredImpfling;
        let waitingList: RegisteredImpfling[] = FileHandling.readArrayFile("/data/waitingList.json");
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");
        let inputTime: string;

        let inputDate: string = await ConsoleHandling.question("Please type in the date to find appointments:");
        while (!Validator.isValidDate(inputDate)) {
            ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.m.yyyy.");
            inputDate = await ConsoleHandling.question("Please type in the date to find appointments:");
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
                        ConsoleHandling.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
                    });
                }
            }
        });
        if (dateAvailable) {
            inputTime = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
            while (!Validator.isValidTime(inputTime)) {
                ConsoleHandling.printInput("\nThis is not a valid input! Please use format hh:mm.");
                inputTime = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
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
                let firstName: string = await ConsoleHandling.question("Please type in your firstname: ");
                while (!Validator.isValidWord(firstName)) {
                    ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    firstName = await ConsoleHandling.question("Please type in your firstname: ");
                }
                let lastName: string = await ConsoleHandling.question("Please type in your lastname: ");
                while (!Validator.isValidWord(firstName)) {
                    ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    lastName = await ConsoleHandling.question("Please type in your lastname: ");
                }
                let birthday: string = await ConsoleHandling.question("Please type in your Birthday Date: ");
                while (!Validator.isValidDate(birthday)) {
                    ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
                    birthday = await ConsoleHandling.question("Please type in your Birthday Date: ");
                }
                let phoneNumber: string = await ConsoleHandling.question("Please type in your phone number: ");
                while (!Validator.isValidNumber(phoneNumber)) {
                    ConsoleHandling.printInput("\nThis is not a valid number!");
                    phoneNumber = await ConsoleHandling.question("Please type in your phone number: ");
                }
                let street: string = await ConsoleHandling.question("Please type in the street you live in: ");
                while (!Validator.isValidWord(street)) {
                    ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    street = await ConsoleHandling.question("Please type in the street you live in: ");
                }
                let houseNumber: string = await ConsoleHandling.question("Please type in your house number: ");
                while (!Validator.isValidNumber(houseNumber)) {
                    ConsoleHandling.printInput("v\nThis is not a valid number!");
                    houseNumber = await ConsoleHandling.question("Please type in your house number: ");
                }
                let postCode: string = await ConsoleHandling.question("Please type in the postcode of your location: ");
                while (!Validator.isValidNumber(postCode)) {
                    ConsoleHandling.printInput("\nThis is not a valid postcode!");
                    postCode = await ConsoleHandling.question("Please type in the postcode of your location: ");
                }
                let city: string = await ConsoleHandling.question("Please type in the city you live in: ");
                while (!Validator.isValidWord(city)) {
                    ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                    city = await ConsoleHandling.question("Please type in the city you live in: ");
                }
                let eMail: string = await ConsoleHandling.question("Please type in your email Address: ");
                while (!Validator.isValidEmail(eMail) || Validator.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
                    ConsoleHandling.printInput("\nThis is not a valid e-mail! Please try again.");
                    eMail = await ConsoleHandling.question("Please type in your email Address: ");
                }
                appointmentsArray.forEach(day => {
                    day.parallelAppointmentInterval.forEach(interval => {
                        interval.parallelAppointments.forEach(appointment => {
                            if (appointment.isAvailable == true && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                                appointment.registeredImpfling = new RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                                appointment.isAvailable = false;
                                alreadyRegistered = true;
                            }
                        });
                    });
                });
            }
            else {
                let answer: string = <string>await ConsoleHandling.showPossibilities(["Sorry, this time is not available.", "(1) try again", "(2) search for another day", "(3) go back to menu"], "Please type in the numbers of the function you want to use.");
                switch (answer) {
                    case "1":
                        inputTime = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
                        appointmentsArray.forEach(day => {
                            day.parallelAppointmentInterval.forEach(interval => {
                                if (inputTime == interval.startTime)
                                    timeAvailable = true;
                            });
                        });
                        if (timeAvailable) {
                            let firstName: string = await ConsoleHandling.question("Please type in your firstname: ");
                            while (!Validator.isValidWord(firstName)) {
                                ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                firstName = await ConsoleHandling.question("Please type in your firstname: ");
                            }
                            let lastName: string = await ConsoleHandling.question("Please type in your lastname: ");
                            while (!Validator.isValidWord(firstName)) {
                                ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                lastName = await ConsoleHandling.question("Please type in your lastname: ");
                            }
                            let birthday: string = await ConsoleHandling.question("Please type in your Birthday Date: ");
                            while (!Validator.isValidDate(birthday)) {
                                ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
                                birthday = await ConsoleHandling.question("Please type in your Birthday Date: ");
                            }
                            let phoneNumber: string = await ConsoleHandling.question("Please type in your phone number: ");
                            while (!Validator.isValidNumber(phoneNumber)) {
                                ConsoleHandling.printInput("\nThis is not a valid number!");
                                phoneNumber = await ConsoleHandling.question("Please type in your phone number: ");
                            }
                            let street: string = await ConsoleHandling.question("Please type in the street you live in: ");
                            while (!Validator.isValidWord(street)) {
                                ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                street = await ConsoleHandling.question("Please type in the street you live in: ");
                            }
                            let houseNumber: string = await ConsoleHandling.question("Please type in your house number: ");
                            while (!Validator.isValidNumber(houseNumber)) {
                                ConsoleHandling.printInput("\nThis is not a valid number!");
                                houseNumber = await ConsoleHandling.question("Please type in your house number: ");
                            }
                            let postCode: string = await ConsoleHandling.question("Please type in the postcode of your location: ");
                            while (!Validator.isValidNumber(postCode)) {
                                ConsoleHandling.printInput("\nThis is not a valid postcode!");
                                postCode = await ConsoleHandling.question("Please type in the postcode of your location: ");
                            }
                            let city: string = await ConsoleHandling.question("Please type in the city you live in: ");
                            while (!Validator.isValidWord(city)) {
                                ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
                                city = await ConsoleHandling.question("Please type in the city you live in: ");
                            }
                            let eMail: string = await ConsoleHandling.question("Please type in your email Address: ");
                            while (!Validator.isValidEmail(eMail) || Validator.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
                                ConsoleHandling.printInput("\nThis is not a valid e-mail! Please try again.");
                                eMail = await ConsoleHandling.question("Please type in your email Address: ");
                            }
                            ConsoleHandling.printInput("Hallo");
                            appointmentsArray.forEach(day => {
                                ConsoleHandling.printInput("Hihi");
                                day.parallelAppointmentInterval.forEach(interval => {
                                    interval.parallelAppointments.forEach(appointment => {
                                        if (appointment.isAvailable == true && day.date == inputDate && interval.startTime == inputTime && !alreadyRegistered) {
                                            appointment.registeredImpfling = new RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);
                                            appointment.isAvailable = false;
                                            alreadyRegistered = true;

                                        }
                                    });
                                });
                            });
                        }
                        else {
                            ConsoleHandling.printInput("Sorry, you repeatedly typed in a time which not exists. Please continue by searching the day.");
                            this.searchSpecificDay();
                        }
                        break;
                    case "2": this.searchSpecificDay();
                        break;
                    case "3":
                        this.showMethods();
                        break;
                }
            }
            FileHandling.writeFile("/data/appointments.json", appointmentsArray);
            ConsoleHandling.printInput("Congratulations! You successfully registered for an appointment on " + inputDate + " at " + inputTime);
            this.showMethods();
        }
        else {
            ConsoleHandling.printInput("\nUnfortunately there are no appointments available on this date.\n");
            this.searchSpecificDay();
        }
    }
    public async registerInWaitingList(): Promise<void> {
        ConsoleHandling.printInput("~register for waiting list~");
        try {
            FileHandling.readArrayFile("/data/appointments.json");
        } catch (error) {
            FileHandling.writeFile("/data/appointments.json", []);
        }
        try {
            FileHandling.readArrayFile("/data/waitingList.json");
        } catch (error) {
            FileHandling.writeFile("/data/waitingList.json", []);
        }
        let waitingList: RegisteredImpfling[] = FileHandling.readArrayFile("/data/waitingList.json");
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");

        let firstName: string = await ConsoleHandling.question("Please type in your firstname: ");
        while (!Validator.isValidWord(firstName)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            firstName = await ConsoleHandling.question("Please type in your firstname: ");
        }
        let lastName: string = await ConsoleHandling.question("Please type in your lastname: ");
        while (!Validator.isValidWord(firstName)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            lastName = await ConsoleHandling.question("Please type in your lastname: ");
        }
        let birthday: string = await ConsoleHandling.question("Please type in your Birthday Date: ");
        while (!Validator.isValidDate(birthday)) {
            ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            birthday = await ConsoleHandling.question("Please type in your Birthday Date: ");
        }
        let phoneNumber: string = await ConsoleHandling.question("Please type in your phone number: ");
        while (!Validator.isValidNumber(phoneNumber)) {
            ConsoleHandling.printInput("\nThis is not a valid number!");
            phoneNumber = await ConsoleHandling.question("Please type in your phone number: ");
        }
        let street: string = await ConsoleHandling.question("Please type in the street you live in: ");
        while (!Validator.isValidWord(street)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            street = await ConsoleHandling.question("Please type in the street you live in: ");
        }
        let houseNumber: string = await ConsoleHandling.question("Please type in your house number: ");
        while (!Validator.isValidNumber(houseNumber)) {
            ConsoleHandling.printInput("\nThis is not a valid number!");
            houseNumber = await ConsoleHandling.question("Please type in your house number: ");
        }
        let postCode: string = await ConsoleHandling.question("Please type in the postcode of your location: ");
        while (!Validator.isValidNumber(postCode)) {
            ConsoleHandling.printInput("\nThis is not a valid postcode!");
            postCode = await ConsoleHandling.question("Please type in the postcode of your location: ");
        }
        let city: string = await ConsoleHandling.question("Please type in the city you live in: ");
        while (!Validator.isValidWord(city)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please refuse using symbols or numbers.");
            city = await ConsoleHandling.question("Please type in the city you live in: ");
        }
        let eMail: string = await ConsoleHandling.question("Please type in your email Address: ");
        while (!Validator.isValidEmail(eMail) || Validator.emailAlreadyExists(eMail, appointmentsArray, waitingList)) {
            ConsoleHandling.printInput("\nThis is not a valid e-mail! Please try again.");
            eMail = await ConsoleHandling.question("Please type in your email Address: ");
        }
        let waitingImpfling: RegisteredImpfling = new RegisteredImpfling(firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);

        waitingList.push(waitingImpfling);
        FileHandling.writeFile("/data/waitingList.json", waitingList);
        ConsoleHandling.printInput("\nCongratulations! You successfully registered yourself on the waiting list.");
        let closeConsole: string;
        closeConsole = await ConsoleHandling.question("Press (x) to close console.");
        while (closeConsole != "x") {
            ConsoleHandling.printInput("\nThis is not a valid input!");
            closeConsole = await ConsoleHandling.question("Press (x) to close console.");
        }
        if (closeConsole == "x")
            ConsoleHandling.closeConsole();
    }
}

