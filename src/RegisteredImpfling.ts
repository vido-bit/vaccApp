import { Appointment } from "./Appointment";
import { ConsoleHandling } from "./ConsoleHandling";
import { v4 as uuidv4 } from "uuid";
export class RegisteredImpfling {
    public _eMail: String;
    private _appointment: Appointment;
    private _firstName: String;
    private _lastName: String;
    private _birthday: Date;
    private _phoneNumber: string;
    private _street: String;
    private _houseNumber: Number;
    private _postCode: Number;
    private _city: String;
    private _uuid: String;

    constructor(_appointment: Appointment, _firstName: String, _lastName: String, _birthday: Date, _phoneNumber: string, _street: String, _houseNumber: Number, _postCode: Number, _city: String, _eMail: String) {
        this._appointment = _appointment;
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._birthday = _birthday;
        this._phoneNumber = _phoneNumber;
        this._street = _street;
        this._houseNumber = _houseNumber;
        this._postCode = _postCode;
        this._city = _city;
        this._eMail = _eMail;
        this._uuid = uuidv4();
    }

}