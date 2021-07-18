import { NullImpfling } from "./NullImpfling";
import { RegisteredImpfling } from "./RegisteredImpfling";

export class Appointment {
    public vaccinationID: number;
    public isAvailable: boolean;
    public registeredImpfling: RegisteredImpfling;

    constructor(_vaccinationID: number, _isavailable: boolean, _registeredImpfling: RegisteredImpfling) {
        this.vaccinationID = _vaccinationID;
        this.isAvailable = _isavailable;
        this.registeredImpfling = _registeredImpfling;
        if (this.registeredImpfling == null) {
            this.registeredImpfling = new NullImpfling("", "", "", "", "", "", "", "", "");
        }
    }
}