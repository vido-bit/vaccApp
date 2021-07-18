export class RegisteredImpfling {
    public firstName: string;
    public lastName: string;
    public birthday: string;
    public phonenumber: string;
    public street: string;
    public housenumber: string;
    public postCode: string;
    public city: string;
    public eMail: string;

    constructor(_firstName: string, _lastName: string, _birthday: string, _phonenumber: string, _street: string, _housenumber: string, _postCode: string, _city: string, _eMail: string) {
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.birthday = _birthday;
        this.phonenumber = _phonenumber;
        this.street = _street;
        this.housenumber = _housenumber;
        this.postCode = _postCode;
        this.city = _city;
        this.eMail = _eMail;
    }

}