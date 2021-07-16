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
        //12 let appointmentArray: Array<AppointmentDay> = FileHandling.readArrayFile("../data/appointments.json");
        let appointmentDay = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        let startTime = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time you want the appointments to start (use format 00:00):");
        let endTime = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time you want the appointments to end (use format 00:00):");
        let parallelVaccination = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        let timeIntervalInMinutes = await ConsoleHandling_1.ConsoleHandling.getInstance().question("Please type in the time in Minutes one vaccination needs to be carried out:");
        let endHours = endTime.substring(0, 1);
        let endMinutes = endTime.substring(3, 4);
        let startHours = startTime.substring(0, 1);
        let startMinutes = startTime.substring(3, 4);
        let hourDifference = parseInt(endHours) - parseInt(startHours);
        let minutesDifference = parseInt(endHours) - parseInt(startHours);
        let hoursInMinutes = hourDifference * 60;
        let totalTimeForAppointmentsThisDay = hoursInMinutes + minutesDifference;
        let totalAppointmentsForThisDay = Math.floor((totalTimeForAppointmentsThisDay / parseInt(timeIntervalInMinutes)));
        let numberOfParallelVaccinations = parseInt(parallelVaccination);
        let newAppointmentNumberString;
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
                        newAppointment[j] = new Appointment_1.Appointment(appointmentIntervalIterator, true);
                        console.log(newAppointment);
                    }
                    newAppointmentNumberString = appointmentCounter.toString() + "-" + (appointmentCounter + numberOfParallelVaccinations - 1).toString();
                    newAppointmentInterval[appointmentIntervalIterator] = new AppointmentInterval_1.AppointmentInterval(newAppointmentNumberString, startTime, endTime, newAppointment);
                    appointmentIntervalIterator++;
                    appointmentCounter += numberOfParallelVaccinations;
                }
            }
        }
        let newAppointmentDay = new AppointmentDay_1.AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccination), parseInt(timeIntervalInMinutes), newAppointmentInterval);
        console.log(newAppointment);
        console.log(newAppointmentInterval);
        console.log(newAppointmentDay);
        FileHandling_1.default.writeFile("/data/appointments.json", newAppointmentDay);
    }
}
exports.AppointmentFactory = AppointmentFactory;
//# sourceMappingURL=AppointmentFactory.js.map