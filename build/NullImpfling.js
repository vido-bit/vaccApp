"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullImpfling = void 0;
const RegisteredImpfling_1 = require("./RegisteredImpfling");
class NullImpfling extends RegisteredImpfling_1.RegisteredImpfling {
    constructor(_firstName, _lastName, _birthday, _phonenumber, _street, _housenumber, _postCode, _city, _eMail) {
        super(_firstName, _lastName, _birthday, _phonenumber, _street, _housenumber, _postCode, _city, _eMail);
        this.firstName = "";
        this.lastName = "";
        this.birthday = "";
        this.phonenumber = "";
        this.street = "";
        this.housenumber = "";
        this.postCode = "";
        this.city = "";
        this.eMail = "";
    }
}
exports.NullImpfling = NullImpfling;
//# sourceMappingURL=NullImpfling.js.map