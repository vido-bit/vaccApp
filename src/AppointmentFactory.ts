import ConsoleHandling from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import Validator from "./Validator";
import { AppointmentDay } from "./AppointmentDay";
import { AppointmentInterval } from "./AppointmentInterval";
import { Appointment } from "./Appointment";
import Admin from "./Admin";
import { RegisteredImpfling } from "./RegisteredImpfling";
export class AppointmentFactory {
    private static _instance: AppointmentFactory = new AppointmentFactory();
    public static getInstance(): AppointmentFactory {
        return AppointmentFactory._instance;
    }
    public async createAppointments(): Promise<void> {
        ConsoleHandling.printInput("~create appointments~\n");
        let appointmentDay: string = await ConsoleHandling.question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        while (!Validator.isValidDate(appointmentDay)) {
            ConsoleHandling.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            appointmentDay = await ConsoleHandling.question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        }
        let startTime: string = await ConsoleHandling.question("Please type in the time you want the appointments to start (use format 00:00):");
        while (!Validator.isValidTime(startTime)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please use format hh:mm.");
            startTime = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
        }
        let endTime: string = await ConsoleHandling.question("Please type in the time you want the appointments to end (use format 00:00):");
        while (!Validator.isValidTime(endTime)) {
            ConsoleHandling.printInput("\nThis is not a valid input! Please use format hh:mm.");
            endTime = await ConsoleHandling.question("Please type in the time of the appointment you want to register for:");
        }
        let parallelVaccinations: string = await ConsoleHandling.question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        while (!Validator.isValidNumber(parallelVaccinations)) {
            ConsoleHandling.printInput("\nThis is not a valid number! Please try again.");
            parallelVaccinations = await ConsoleHandling.question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        }
        let timeIntervalInMinutes: string = await ConsoleHandling.question("Please type in the time in Minutes one vaccination needs to be carried out:");
        while (!Validator.isValidNumber(timeIntervalInMinutes)) {
            ConsoleHandling.printInput("\nThis is not a valid number! Please try again.");
            timeIntervalInMinutes = await ConsoleHandling.question("Please type in the time in Minutes one vaccination needs to be carried out:");
        }
        let endHours: string = endTime.substring(0, 2);
        let endMinutes: string = endTime.substring(3, 5);
        let startHours: string = startTime.substring(0, 2);
        let startMinutes: string = startTime.substring(3, 5);
        let hourDifference: number = parseInt(endHours) - parseInt(startHours);
        let minutesDifference: number = parseInt(endMinutes) - parseInt(startMinutes);
        let hoursInMinutes: number = (hourDifference * 60);
        let totalMinutesForAppointmentsThisDay: number = Math.round(hoursInMinutes + (minutesDifference));
        let totalAppointmentIntervals: number = Math.floor((totalMinutesForAppointmentsThisDay / parseInt(timeIntervalInMinutes)));
        let parallelVaccinationsatOneAppointment: number = parseInt(parallelVaccinations);
        let totalAppointmentsForThisDay: number = Math.floor(totalAppointmentIntervals * parallelVaccinationsatOneAppointment);
        let newAppointmentNumberString: string;
        let appointmentIntervalIterator: number = 0;
        let appointmentIntervalCounter: number = 1;
        let appointmentIterator: number = 0;
        let startIntervalHours: number = parseInt(startHours);
        let endIntervalHours: number = startIntervalHours;
        let startIntervalMinutes: number = parseInt(startMinutes);
        let endIntervalMinutes: number = startIntervalMinutes + parseInt(timeIntervalInMinutes);
        let startTimeInterval: string;
        let endTimeInterval: string;
        let newAppointmentInterval: AppointmentInterval[];
        newAppointmentInterval = new Array(totalAppointmentIntervals);

        for (let i: number = 0; i < totalAppointmentsForThisDay + 1; i++) {
            //appointmentIterator++;
            if (i > 0) {
                if (i % parallelVaccinationsatOneAppointment == 0) {
                    let newAppointment: Appointment[];
                    newAppointment = new Array(parallelVaccinationsatOneAppointment);
                    for (let j: number = 0; j < parallelVaccinationsatOneAppointment; j++) {
                        appointmentIterator++;
                        newAppointment[j] = new Appointment(appointmentIterator, true, null);
                    }
                    if (startIntervalMinutes >= 60) {
                        let minutesInHours: number = Math.floor(startIntervalMinutes / 60);
                        startIntervalMinutes -= (minutesInHours * 60);
                        startIntervalHours += minutesInHours;
                    }
                    if (startIntervalHours > 23) {
                        startIntervalHours -= 24;
                    }
                    if (endIntervalMinutes >= 60) {
                        let minutesInHours: number = Math.floor(endIntervalMinutes / 60);
                        endIntervalMinutes -= (minutesInHours * 60);
                        endIntervalHours += minutesInHours;
                    }
                    if (endIntervalHours > 23) {
                        endIntervalHours -= 24;
                    }
                    if (startIntervalHours < 10 && startIntervalMinutes < 10) {
                        startTimeInterval = "0" + startIntervalHours.toString() + ":0" + startIntervalMinutes.toString();
                    }
                    else if (startIntervalMinutes < 10 && startIntervalHours >= 10) {
                        startTimeInterval = startIntervalHours.toString() + ":0" + startIntervalMinutes.toString();
                    }
                    else if (startIntervalHours < 10 && startIntervalMinutes >= 10) {
                        startTimeInterval = "0" + startIntervalHours.toString() + ":" + startIntervalMinutes.toString();
                    }
                    else {
                        startTimeInterval = startIntervalHours.toString() + ":" + startIntervalMinutes.toString();
                    }
                    if (endIntervalHours < 10 && endIntervalMinutes < 10) {
                        endTimeInterval = "0" + endIntervalHours.toString() + ":0" + endIntervalMinutes.toString();
                    }
                    else if (endIntervalMinutes < 10 && endIntervalHours >= 10) {
                        endTimeInterval = endIntervalHours.toString() + ":0" + endIntervalMinutes.toString();
                    }
                    else if (endIntervalHours < 10 && endIntervalMinutes >= 10) {
                        endTimeInterval = "0" + endIntervalHours.toString() + ":" + endIntervalMinutes.toString();
                    }
                    else {
                        endTimeInterval = endIntervalHours.toString() + ":" + endIntervalMinutes.toString();
                    }
                    newAppointmentNumberString = appointmentIntervalCounter.toString() + "-" + (appointmentIntervalCounter + parallelVaccinationsatOneAppointment - 1).toString();
                    newAppointmentInterval[appointmentIntervalIterator] = new AppointmentInterval(newAppointmentNumberString, startTimeInterval, endTimeInterval, newAppointment);
                    appointmentIntervalIterator++;
                    appointmentIntervalCounter += parallelVaccinationsatOneAppointment;
                    endIntervalMinutes += parseInt(timeIntervalInMinutes);
                    startIntervalMinutes += parseInt(timeIntervalInMinutes);
                }
            }
        }
        try {
            FileHandling.readArrayFile("/data/appointments.json");
        } catch (error) {
            FileHandling.writeFile("/data/appointments.json", []);
        }
        let appointmentDays: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");
        let newAppointmentsDay: AppointmentDay = new AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccinations), parseInt(timeIntervalInMinutes), newAppointmentInterval);
        this.pullOutOfWaitingList(newAppointmentsDay);
        appointmentDays.push(newAppointmentsDay);
        FileHandling.writeFile("/data/appointments.json", appointmentDays);
        ConsoleHandling.printInput("Congratulations! You successfully created some appointments on " + appointmentDay);
        Admin.goNext();
    }
    public pullOutOfWaitingList(_newAppointmentsDay: AppointmentDay): void {
        let counter: number = 0;
        let waitingList: RegisteredImpfling[] = FileHandling.readArrayFile("/data/waitingList.json");
        _newAppointmentsDay.parallelAppointmentInterval.forEach(interval => {
            interval.parallelAppointments.forEach(appointment => {
                if (appointment.isAvailable && waitingList.length > 0 && counter < waitingList.length) {
                    appointment.registeredImpfling = waitingList[counter];
                    appointment.isAvailable = false;
                    this.confirmAppointmentPerEmail(waitingList[counter].eMail);
                    counter++;
                    waitingList.shift();
                }
            });
        });
    }
    public confirmAppointmentPerEmail(_eMail: string): void {
        ConsoleHandling.printInput("To confirm the registration for an appointment an Email has been send to " + _eMail + ".");
    }
}
