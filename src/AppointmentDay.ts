import { AppointmentInterval } from "./AppointmentInterval";
import { Appointment } from "./Appointment";
export class AppointmentDay {
    public date: string;
    public startTime: string;
    public endTime: string;
    public parallelVaccinations: Number;
    public timeIntervalInMinutes: Number;
    public parallelAppointmentInterval: AppointmentInterval[];


    constructor(_date: string, _startTime: string, _endTime: string, _parallelVaccinations: Number, _timeIntervalInMinutes: Number, _parallelAppointments: AppointmentInterval[]) {
        this.date = _date;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.parallelVaccinations = _parallelVaccinations;
        this.parallelAppointmentInterval = _parallelAppointments;
        this.timeIntervalInMinutes = _timeIntervalInMinutes;
    }
}