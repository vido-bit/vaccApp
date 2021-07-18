import { RegisteredImpfling } from "./RegisteredImpfling";

export class NullImpfling extends RegisteredImpfling {


    constructor(_firstName: string, _lastName: string, _birthday: string, _phonenumber: string, _street: string, _housenumber: string, _postCode: string, _city: string, _eMail: string) {
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