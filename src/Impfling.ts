import { NullLiteral } from "typescript";
import { Appointment } from "./Appointment";
import { ConsoleHandling } from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import { RegisteredImpfling } from "./RegisteredImpfling";
export class Impfling {
    private static _instance: Impfling = new Impfling();
    private _date: Date;

    private constructor() {
        if (Impfling._instance)
            throw new Error("Use Impfling.getInstance() instead new Impfling()");
        Impfling._instance = this;
    }
    public static getInstance(): Impfling {
        return Impfling._instance;
    }
    public async createImpfling(): Promise<void> {
        let impflingArray: Array<RegisteredImpfling> = FileHandling.readArrayFile("../data/appointments.json");

        let appointment: Appointment;
        let firstName: string = await ConsoleHandling.getInstance().question("Please type in your firstname:");
        let lastName: string = await ConsoleHandling.getInstance().question("Please type in your lastname:");
        // let birthdayString: string = await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
        // let birthday: Date = new Date(birthdayString);
        let birthday: Date = await (await this.enterBirthday());

        let phoneNumber: string = await ConsoleHandling.getInstance().question("Please type in your phone number:");

        let street: string = await ConsoleHandling.getInstance().question("Please type in the street you live in:");

        let houseNumberString: string = await ConsoleHandling.getInstance().question("Please type in your house number:");
        let houseNumber: Number = parseInt(houseNumberString);

        let postCodeString: string = await ConsoleHandling.getInstance().question("Please type in the postcode of your location:");
        let postCode: Number = parseFloat(postCodeString);

        let city: string = await ConsoleHandling.getInstance().question("Please type in the city you live in:");
        let eMail: string; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, impflingArray)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling.getInstance().question("Email");
        }

        let registeredImpfling: RegisteredImpfling = new RegisteredImpfling(appointment, firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);

        impflingArray.push(registeredImpfling);
        FileHandling.writeFile("../data/appointments.json", impflingArray);
    }
    public async enterBirthday(): Promise<Date> {
        let birthday: Date;
        try {
            let birthdayString: string = await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd.-mm-yyyy:");
            birthday = new Date(birthdayString);
            return birthday;
        } catch (e) {
            console.log("wrong Date format"); //, await ConsoleHandling.getInstance().question("Please type in your birthday date in format dd-mm-yyyy:")
            return this.enterBirthday();
        }

    }

    public showDayswithFreeAppointments(): void {

    }

    public searchSpecificDay(): void {

    }

    public searchForASpecificDay(_date: Date): void {

    }

    public async registerInWaitingList(): Promise<void> {
        let waitingList: Array<RegisteredImpfling> = FileHandling.readArrayFile("../data/waitingList.json");

        let appointment: null;
        let firstName: string = await ConsoleHandling.getInstance().question("Please type in your firstname:");
        let lastName: string = await ConsoleHandling.getInstance().question("Please type in your lastname:");
        let birthday: Date = await (await this.enterBirthday());

        let phoneNumber: string = await ConsoleHandling.getInstance().question("Please type in your phone number:");

        let street: string = await ConsoleHandling.getInstance().question("Please type in the street you live in:");

        let houseNumberString: string = await ConsoleHandling.getInstance().question("Please type in your house number:");
        let houseNumber: Number = parseInt(houseNumberString);

        let postCodeString: string = await ConsoleHandling.getInstance().question("Please type in the postcode of your location:");
        let postCode: Number = parseFloat(postCodeString);

        let city: string = await ConsoleHandling.getInstance().question("Please type in the city you live in:");
        let eMail: string; // = await ConsoleHandling.getInstance().question("Email");
        while (!this.isValidEmail(eMail) || this.emailAlreadyExists(eMail, waitingList)) {
            console.log("This is not a valid e-mail");
            eMail = await ConsoleHandling.getInstance().question("Email");
        }
        let registeredImpfling: RegisteredImpfling = new RegisteredImpfling(appointment, firstName, lastName, birthday, phoneNumber, street, houseNumber, postCode, city, eMail);

        waitingList.push(registeredImpfling);
        FileHandling.writeFile("../data/waitingList.json", waitingList);
    }

    public isValidEmail(_eMail: string): boolean {
        let regex: RegExp = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
        return regex.test(_eMail);
    }
    private emailAlreadyExists(_eMail: string, impflingArray: RegisteredImpfling[]): boolean {
        for (let impfling of impflingArray) {
            if (impfling._eMail == _eMail) {
                return true;
            }
        }
        return false;
    }
}

