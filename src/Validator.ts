import { AppointmentDay } from "./AppointmentDay";
import { RegisteredImpfling } from "./RegisteredImpfling";

export class Validator {
    private static _instance: Validator = new Validator();

    constructor() {
        if (Validator._instance)
            throw new Error("Use Validator.getInstance() instead new Validator()");
        Validator._instance = this;
    }
    public static getInstance(): Validator {
        return Validator._instance;
    }

    public isValidNumber(_number: string): boolean {
        let regex: RegExp = /^[0-9]*$/;
        return regex.test(_number);
    }
    public isValidDate(_date: string): boolean {
        let regex: RegExp = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        return regex.test(_date);
    }
    public isValidWord(_word: string): boolean {
        let regex: RegExp = /^[\u00C0-\u017Fa-zA-Z'][\u00C0-\u017Fa-zA-Z-' ]+[\u00C0-\u017Fa-zA-Z']?$/;
        return regex.test(_word);
    }
    public isValidTime(_time: string): boolean {
        let regex: RegExp = /^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/;
        return regex.test(_time);
    }
    public isValidEmail(_eMail: string): boolean {
        let regex: RegExp = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
        return regex.test(_eMail);
    }
    // public timeExists(_inputTime: string,): boolean {

    // }
    public emailAlreadyExists(_eMail: string, appointmentsArray: AppointmentDay[], waitingList: RegisteredImpfling[]): boolean {
        let existingMail: boolean = false;
        for (let waitingImpfling of waitingList) {
            if (waitingImpfling.eMail == _eMail) {
                existingMail = true;
            }
        }
        if (!existingMail) {
            appointmentsArray.forEach(day => {
                day.parallelAppointmentInterval.forEach(interval => {
                    interval.parallelAppointments.forEach(appointment => {
                        if (!appointment.isAvailable && appointment.registeredImpfling.eMail == _eMail) {
                            existingMail = true;
                        }
                    });
                });
            });
        }
        if (existingMail)
            return true;
        return false;
    }
}
export default Validator.getInstance();