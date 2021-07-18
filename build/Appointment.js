"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const NullImpfling_1 = require("./NullImpfling");
class Appointment {
    vaccinationID;
    isAvailable;
    registeredImpfling;
    constructor(_vaccinationID, _isavailable, _registeredImpfling) {
        this.vaccinationID = _vaccinationID;
        this.isAvailable = _isavailable;
        this.registeredImpfling = _registeredImpfling;
        if (this.registeredImpfling == null) {
            this.registeredImpfling = new NullImpfling_1.NullImpfling("", "", "", "", "", "", "", "", "");
        }
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=Appointment.js.map