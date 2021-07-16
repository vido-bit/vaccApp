"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOverview = void 0;
class DayOverview {
    _date;
    day;
    month;
    year;
    constructor(_date) {
        this.day = parseInt(_date.substring(0, 1));
        this.month = parseInt(_date.substring(3, 4));
        this.year = parseInt(_date.substring(6, 9));
    }
}
exports.DayOverview = DayOverview;
//# sourceMappingURL=DayOverview.js.map