

export class DayOverview {
    public _date: String;
    private day: Number;
    private month: Number;
    private year: Number;
    constructor(_date: String) {
        this.day = parseInt(_date.substring(0, 1));
        this.month = parseInt(_date.substring(3, 4));
        this.year = parseInt(_date.substring(6, 9));
    }
}

