"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredImpfling = void 0;
const uuid_1 = require("uuid");
class RegisteredImpfling {
    _eMail;
    _appointment;
    _firstName;
    _lastName;
    _birthday;
    _phoneNumber;
    _street;
    _houseNumber;
    _postCode;
    _city;
    _uuid;
    constructor(_appointment, _firstName, _lastName, _birthday, _phoneNumber, _street, _houseNumber, _postCode, _city, _eMail) {
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
        this._uuid = uuid_1.v4();
    }
}
exports.RegisteredImpfling = RegisteredImpfling;
//# sourceMappingURL=RegisteredImpfling.js.map