import { start } from "repl";
import { AppointmentDay } from "./AppointmentDay";
import { ConsoleHandling } from "./ConsoleHandling";
import { DayOverview } from "./DayOverview";
import FileHandling from "./FileHandling";
import { AppointmentInterval } from "./AppointmentInterval";
import { AppointmentFactory } from "./AppointmentFactory";

export class Admin {
    private static _instance: Admin = new Admin();
    private _username: String;
    private _password: String;

    constructor() {
        if (Admin._instance)
            throw new Error("Use Admin.getInstance() instead new Admin()");
        Admin._instance = this;
    }
    public static getInstance(): Admin {
        return Admin._instance;
    }
    public login(): void {
        let appointmentFactory: AppointmentFactory = new AppointmentFactory();
        appointmentFactory.createAppointment();
    }

    public passwordEntry(_username: String, _password: String): void {

    }

    // private async createAppointments(): Promise<void> {

    // let appointmentArray: Array<AppointmentDay> = FileHandling.readArrayFile("../data/appointments.json");

    // let appointmentDay: string = await ConsoleHandling.getInstance().question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
    // let startTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to start (use format 00:00):");
    // let endTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to end (use format 00:00):");
    // let parallelVaccination: string = await ConsoleHandling.getInstance().question("Please type in the Number of Vaccinations you want to be carried out parallel:");
    // let timeIntervalInMinutes: string = await ConsoleHandling.getInstance().question("Please type in the time in Minutes one vaccination needs to be carried out:");
    // let endHours: string = endTime.substring(0, 1);
    // let endMinutes: string = endTime.substring(3, 4);
    // let startHours: string = startTime.substring(0, 1);
    // let startMinutes: string = startTime.substring(3, 4);
    // let hourDifference: number = parseInt(endHours) - parseInt(startHours);
    // let minutesDifference: number = parseInt(endHours) - parseInt(startHours);
    // let hoursInMinutes: number = hourDifference * 60;
    // let timeForAppointmentsInMinutes: number = hoursInMinutes + minutesDifference;
    // let appointmentsForThisDay: Number = Math.floor(parseInt(timeIntervalInMinutes) / timeForAppointmentsInMinutes);
    // let newParallelVaccinations: ParallelVaccinations[];
    // for (let i: number = 0; i < appointmentsForThisDay; i++) {

    //     newParallelVaccinations = new ParallelVaccinations(startTime, endTime, i);
    // }
    // let newAppointmentDay: AppointmentDay = new AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccination), parseInt(timeIntervalInMinutes), newParallelVaccinations);

    // }

    private async showDayOverview(): Promise<void> {



        //     let date: string = await ConsoleHandling.getInstance().question("Please type in the day you want to an overview for (use format dd-mm-yyyy):");
        // let overview: dayOverview = new dayOverview(date);

    }

    private async showStatistics(): Promise<void> {

    }

}
export default Admin.getInstance();