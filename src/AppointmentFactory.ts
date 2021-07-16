import { ConsoleHandling } from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import { AppointmentDay } from "./AppointmentDay";
import { AppointmentInterval } from "./AppointmentInterval";
import { Appointment } from "./Appointment";
export class AppointmentFactory {

    public async createAppointment(): Promise<void> {
        console.log("methode // createAppointment");

        //12 let appointmentArray: Array<AppointmentDay> = FileHandling.readArrayFile("../data/appointments.json");
        let appointmentDay: string = await ConsoleHandling.getInstance().question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        let startTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to start (use format 00:00):");
        let endTime: string = await ConsoleHandling.getInstance().question("Please type in the time you want the appointments to end (use format 00:00):");
        let parallelVaccination: string = await ConsoleHandling.getInstance().question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        let timeIntervalInMinutes: string = await ConsoleHandling.getInstance().question("Please type in the time in Minutes one vaccination needs to be carried out:");
        let endHours: string = endTime.substring(0, 1);
        let endMinutes: string = endTime.substring(3, 4);
        let startHours: string = startTime.substring(0, 1);
        let startMinutes: string = startTime.substring(3, 4);
        let hourDifference: number = parseInt(endHours) - parseInt(startHours);
        let minutesDifference: number = parseInt(endHours) - parseInt(startHours);
        let hoursInMinutes: number = hourDifference * 60;
        let totalTimeForAppointmentsThisDay: number = hoursInMinutes + minutesDifference;
        let totalAppointmentsForThisDay: number = Math.floor((totalTimeForAppointmentsThisDay / parseInt(timeIntervalInMinutes)));
        let numberOfParallelVaccinations: number = parseInt(parallelVaccination);
        let newAppointmentNumberString: string;
        let totalAppointmentIntervals: number = (totalAppointmentsForThisDay / numberOfParallelVaccinations);
        let newAppointmentInterval: AppointmentInterval[];
        newAppointmentInterval = new Array(totalAppointmentIntervals);
        let appointmentIntervalIterator: number = 0;
        let appointmentCounter: number = 1;
        let appointmentIterator: number = 0;
        let newAppointment: Appointment[];
        newAppointment = new Array(numberOfParallelVaccinations);
        for (let i: number = 0; i < totalAppointmentsForThisDay; i++) {
            appointmentIterator++;
            if (i > 0) {
                if (i % numberOfParallelVaccinations == 0) {
                    for (let j: number = 0; j < numberOfParallelVaccinations; j++) {
                        newAppointment[j] = new Appointment(appointmentIntervalIterator, true);
                        console.log(newAppointment);
                    }
                    newAppointmentNumberString = appointmentCounter.toString() + "-" + (appointmentCounter + numberOfParallelVaccinations - 1).toString();
                    newAppointmentInterval[appointmentIntervalIterator] = new AppointmentInterval(newAppointmentNumberString, startTime, endTime, newAppointment);
                    appointmentIntervalIterator++;
                    appointmentCounter += numberOfParallelVaccinations;
                }
            }
        }
        let newAppointmentDay: AppointmentDay = new AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccination), parseInt(timeIntervalInMinutes), newAppointmentInterval);
        console.log(newAppointment);
        console.log(newAppointmentInterval);
        console.log(newAppointmentDay);
        FileHandling.writeFile("/data/appointments.json", newAppointmentDay);
    }
}
