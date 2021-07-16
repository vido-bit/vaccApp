import { AppointmentInterval } from "./AppointmentInterval";
import { Appointment } from "./Appointment";
export class AppointmentDay {
    private _date: String;
    private _startTime: String;
    private _endTime: String;
    private _parallelVaccinations: Number;
    private _timeIntervalInMinutes: Number;
    private _parallelAppointmentInterval: AppointmentInterval[];


    constructor(_date: String, _startTime: String, _endTime: String, _parallelVaccinations: Number, _timeIntervalInMinutes: Number, _parallelAppointments: AppointmentInterval[]) {
        this._date = _date;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._parallelVaccinations = _parallelVaccinations;
        this._parallelAppointmentInterval = _parallelAppointments;
        this._timeIntervalInMinutes = _timeIntervalInMinutes;
    }
}