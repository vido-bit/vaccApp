"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static _instance = new Validator();
    constructor() {
        if (Validator._instance)
            throw new Error("Use Validator.getInstance() instead new Validator()");
        Validator._instance = this;
    }
    static getInstance() {
        return Validator._instance;
    }
    isValidNumber(_number) {
        let regex = /^[0-9]*$/;
        return regex.test(_number);
    }
    isValidDate(_date) {
        let regex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
        return regex.test(_date);
    }
    isValidWord(_word) {
        let regex = /^[\u00C0-\u017Fa-zA-Z'][\u00C0-\u017Fa-zA-Z-' ]+[\u00C0-\u017Fa-zA-Z']?$/;
        return regex.test(_word);
    }
    isValidTime(_time) {
        let regex = /^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/;
        return regex.test(_time);
    }
    isValidEmail(_eMail) {
        let regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
        return regex.test(_eMail);
    }
    // public timeExists(_inputTime: string,): boolean {
    // }
    emailAlreadyExists(_eMail, appointmentsArray, waitingList) {
        let existingMail = false;
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
exports.Validator = Validator;
exports.default = Validator.getInstance();
//# sourceMappingURL=Validator.js.map