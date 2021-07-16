"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDay = void 0;
class AppointmentDay {
    _date;
    _startTime;
    _endTime;
    _parallelVaccinations;
    _timeIntervalInMinutes;
    _parallelAppointmentInterval;
    constructor(_date, _startTime, _endTime, _parallelVaccinations, _timeIntervalInMinutes, _parallelAppointments) {
        this._date = _date;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._parallelVaccinations = _parallelVaccinations;
        this._parallelAppointmentInterval = _parallelAppointments;
        this._timeIntervalInMinutes = _timeIntervalInMinutes;
    }
}
exports.AppointmentDay = AppointmentDay;
//# sourceMappingURL=AppointmentDay.js.map