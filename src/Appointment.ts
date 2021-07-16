
export class Appointment {
    private _vaccinationID: number;
    private _isAvailable: boolean;

    constructor(_vaccinationID: number, _isavailable: boolean) {
        this._vaccinationID = _vaccinationID;
        this._isAvailable = _isavailable;
    }
}