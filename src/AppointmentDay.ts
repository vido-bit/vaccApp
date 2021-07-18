import { AppointmentInterval } from "./AppointmentInterval";
export class AppointmentDay {
    public date: string;
    public startTime: string;
    public endTime: string;
    public parallelVaccinations: number;
    public timeIntervalInMinutes: number;
    public parallelAppointmentInterval: AppointmentInterval[];

    constructor(_date: string, _startTime: string, _endTime: string, _parallelVaccinations: number, _timeIntervalInMinutes: number, _parallelAppointments: AppointmentInterval[]) {
        this.date = _date;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.parallelVaccinations = _parallelVaccinations;
        this.parallelAppointmentInterval = _parallelAppointments;
        this.timeIntervalInMinutes = _timeIntervalInMinutes;
    }
}