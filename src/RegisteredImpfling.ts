export class RegisteredImpfling {
    public _firstName: string;
    public _lastName: string;
    public _birthday: string;
    public _phonenumber: string;
    public _street: string;
    public _housenumber: string;
    public _postCode: string;
    public _city: string;
    public _eMail: string;

    constructor(_firstName: string, _lastName: string, _birthday: string, _phonenumber: string, _street: string, _housenumber: string, _postCode: string, _city: string, _eMail: string) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._birthday = _birthday;
        this._phonenumber = _phonenumber;
        this._street = _street;
        this._housenumber = _housenumber;
        this._postCode = _postCode;
        this._city = _city;
        this._eMail = _eMail;
    }

}