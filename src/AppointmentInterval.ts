import { Appointment } from "./Appointment";

export class AppointmentInterval {
    private _appointmentNumbersString: string;
    private _startTime: string;
    private _endTime: string;
    private _parallelAppointments: Appointment[];

    constructor(_appointmentNumbersString: string, _startTime: string, _endTime: string, _parallelAppointments: Appointment[]) {
        this._appointmentNumbersString = _appointmentNumbersString;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._parallelAppointments = _parallelAppointments;
    }
}