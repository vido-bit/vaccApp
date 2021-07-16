import { Appointment } from "./Appointment";

export class AppointmentInterval {
    public appointmentNumbersString: string;
    public startTime: string;
    public endTime: string;
    public parallelAppointments: Appointment[];

    constructor(_appointmentNumbersString: string, _startTime: string, _endTime: string, _parallelAppointments: Appointment[]) {
        this.appointmentNumbersString = _appointmentNumbersString;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.parallelAppointments = _parallelAppointments;
    }
}