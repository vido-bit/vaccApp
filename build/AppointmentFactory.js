"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentFactory = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const AppointmentDay_1 = require("./AppointmentDay");
const AppointmentInterval_1 = require("./AppointmentInterval");
const Appointment_1 = require("./Appointment");
class AppointmentFactory {
    async createAppointment() {
        console.log("methode // createAppointment");
        // let appointmentArray: Array<AppointmentDay> = FileHandling.readArrayFile("../data/appointments.json");
        let appointmentDay = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        let startTime = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time you want the appointments to start (use format 00:00):");
        let endTime = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time you want the appointments to end (use format 00:00):");
        let parallelVaccination = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        let timeIntervalInMinutes = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time in Minutes one vaccination needs to be carried out:");
        let endHours = endTime.substring(0, 2);
        let endMinutes = endTime.substring(3, 5);
        let startHours = startTime.substring(0, 2);
        let startMinutes = startTime.substring(3, 5);
        let hourDifference = Math.abs(parseInt(endHours) - parseInt(startHours));
        let minutesDifference = Math.abs(parseInt(endMinutes) - parseInt(startMinutes));
        let hoursInMinutes = hourDifference * 60;
        let totalTimeForAppointmentsThisDay = hoursInMinutes + minutesDifference;
        let totalAppointmentsForThisDay = Math.floor((totalTimeForAppointmentsThisDay / parseInt(timeIntervalInMinutes)));
        let numberOfParallelVaccinations = parseInt(parallelVaccination);
        let newAppointmentNumberString;
        console.log(startHours, endHours);
        console.log(startMinutes, endMinutes);
        console.log(totalTimeForAppointmentsThisDay, timeIntervalInMinutes);
        console.log(totalAppointmentsForThisDay);
        let totalAppointmentIntervals = (totalAppointmentsForThisDay / numberOfParallelVaccinations);
        let newAppointmentInterval;
        newAppointmentInterval = new Array(totalAppointmentIntervals);
        let appointmentIntervalIterator = 0;
        let appointmentCounter = 1;
        let appointmentIterator = 0;
        let newAppointment;
        newAppointment = new Array(numberOfParallelVaccinations);
        for (let i = 0; i < totalAppointmentsForThisDay; i++) {
            appointmentIterator++;
            if (i > 0) {
                if (i % numberOfParallelVaccinations == 0) {
                    for (let j = 0; j < numberOfParallelVaccinations; j++) {
                        newAppointment[j] = new Appointment_1.Appointment(appointmentIterator, true, null);
                    }
                    newAppointmentNumberString = appointmentCounter.toString() + "-" + (appointmentCounter + numberOfParallelVaccinations - 1).toString();
                    newAppointmentInterval[appointmentIntervalIterator] = new AppointmentInterval_1.AppointmentInterval(newAppointmentNumberString, startTime, endTime, newAppointment);
                    appointmentIntervalIterator++;
                    appointmentCounter += numberOfParallelVaccinations;
                }
            }
        }
        let newAppointmentDay = new AppointmentDay_1.AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccination), parseInt(timeIntervalInMinutes), newAppointmentInterval);
        console.log(newAppointmentDay);
        FileHandling_1.default.writeFile("/data/appointments.json", newAppointmentDay);
    }
}
exports.AppointmentFactory = AppointmentFactory;
//# sourceMappingURL=AppointmentFactory.js.map