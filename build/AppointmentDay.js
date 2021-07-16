"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDay = void 0;
class AppointmentDay {
    date;
    startTime;
    endTime;
    parallelVaccinations;
    timeIntervalInMinutes;
    parallelAppointmentInterval;
    constructor(_date, _startTime, _endTime, _parallelVaccinations, _timeIntervalInMinutes, _parallelAppointments) {
        this.date = _date;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.parallelVaccinations = _parallelVaccinations;
        this.parallelAppointmentInterval = _parallelAppointments;
        this.timeIntervalInMinutes = _timeIntervalInMinutes;
    }
}
exports.AppointmentDay = AppointmentDay;
//# sourceMappingURL=AppointmentDay.js.map