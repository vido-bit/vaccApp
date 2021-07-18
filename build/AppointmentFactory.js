"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentFactory = void 0;
const ConsoleHandling_1 = require("./ConsoleHandling");
const FileHandling_1 = require("./FileHandling");
const Validator_1 = require("./Validator");
const AppointmentDay_1 = require("./AppointmentDay");
const AppointmentInterval_1 = require("./AppointmentInterval");
const Appointment_1 = require("./Appointment");
const Admin_1 = require("./Admin");
class AppointmentFactory {
    static _instance = new AppointmentFactory();
    static getInstance() {
        return AppointmentFactory._instance;
    }
    async createAppointments() {
        ConsoleHandling_1.default.printInput("~create appointments~\n");
        let appointmentDay = await ConsoleHandling_1.default.question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        while (!Validator_1.default.isValidDate(appointmentDay)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid date! Please use format dd.mm.yyyy.");
            appointmentDay = await ConsoleHandling_1.default.question("Please type in the day you want to create appointments for (use format dd-mm-yyyy):");
        }
        let startTime = await ConsoleHandling_1.default.question("Please type in the time you want the appointments to start (use format 00:00):");
        while (!Validator_1.default.isValidTime(startTime)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please use format hh:mm.");
            startTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
        }
        let endTime = await ConsoleHandling_1.default.question("Please type in the time you want the appointments to end (use format 00:00):");
        while (!Validator_1.default.isValidTime(endTime)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid input! Please use format hh:mm.");
            endTime = await ConsoleHandling_1.default.question("Please type in the time of the appointment you want to register for:");
        }
        let parallelVaccinations = await ConsoleHandling_1.default.question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        while (!Validator_1.default.isValidNumber(parallelVaccinations)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number! Please try again.");
            parallelVaccinations = await ConsoleHandling_1.default.question("Please type in the Number of Vaccinations you want to be carried out parallel:");
        }
        let timeIntervalInMinutes = await ConsoleHandling_1.default.question("Please type in the time in Minutes one vaccination needs to be carried out:");
        while (!Validator_1.default.isValidNumber(timeIntervalInMinutes)) {
            ConsoleHandling_1.default.printInput("\nThis is not a valid number! Please try again.");
            timeIntervalInMinutes = await ConsoleHandling_1.default.question("Please type in the time in Minutes one vaccination needs to be carried out:");
        }
        let endHours = endTime.substring(0, 2);
        let endMinutes = endTime.substring(3, 5);
        let startHours = startTime.substring(0, 2);
        let startMinutes = startTime.substring(3, 5);
        let hourDifference = parseInt(endHours) - parseInt(startHours);
        let minutesDifference = parseInt(endMinutes) - parseInt(startMinutes);
        let hoursInMinutes = (hourDifference * 60);
        let totalMinutesForAppointmentsThisDay = Math.round(hoursInMinutes + (minutesDifference));
        let totalAppointmentIntervals = Math.floor((totalMinutesForAppointmentsThisDay / parseInt(timeIntervalInMinutes)));
        let parallelVaccinationsatOneAppointment = parseInt(parallelVaccinations);
        let totalAppointmentsForThisDay = Math.floor(totalAppointmentIntervals * parallelVaccinationsatOneAppointment);
        let newAppointmentNumberString;
        let appointmentIntervalIterator = 0;
        let appointmentIntervalCounter = 1;
        let appointmentIterator = 0;
        let startIntervalHours = parseInt(startHours);
        let endIntervalHours = startIntervalHours;
        let startIntervalMinutes = parseInt(startMinutes);
        let endIntervalMinutes = startIntervalMinutes + parseInt(timeIntervalInMinutes);
        let startTimeInterval;
        let endTimeInterval;
        let newAppointmentInterval;
        newAppointmentInterval = new Array(totalAppointmentIntervals);
        for (let i = 0; i < totalAppointmentsForThisDay + 1; i++) {
            //appointmentIterator++;
            if (i > 0) {
                if (i % parallelVaccinationsatOneAppointment == 0) {
                    let newAppointment;
                    newAppointment = new Array(parallelVaccinationsatOneAppointment);
                    for (let j = 0; j < parallelVaccinationsatOneAppointment; j++) {
                        appointmentIterator++;
                        newAppointment[j] = new Appointment_1.Appointment(appointmentIterator, true, null);
                    }
                    if (startIntervalMinutes >= 60) {
                        let minutesInHours = Math.floor(startIntervalMinutes / 60);
                        startIntervalMinutes -= (minutesInHours * 60);
                        startIntervalHours += minutesInHours;
                    }
                    if (startIntervalHours > 23) {
                        startIntervalHours -= 24;
                    }
                    if (endIntervalMinutes >= 60) {
                        let minutesInHours = Math.floor(endIntervalMinutes / 60);
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
                    newAppointmentInterval[appointmentIntervalIterator] = new AppointmentInterval_1.AppointmentInterval(newAppointmentNumberString, startTimeInterval, endTimeInterval, newAppointment);
                    appointmentIntervalIterator++;
                    appointmentIntervalCounter += parallelVaccinationsatOneAppointment;
                    endIntervalMinutes += parseInt(timeIntervalInMinutes);
                    startIntervalMinutes += parseInt(timeIntervalInMinutes);
                }
            }
        }
        try {
            FileHandling_1.default.readArrayFile("/data/appointments.json");
        }
        catch (error) {
            FileHandling_1.default.writeFile("/data/appointments.json", []);
        }
        let appointmentDays = FileHandling_1.default.readArrayFile("/data/appointments.json");
        let newAppointmentsDay = new AppointmentDay_1.AppointmentDay(appointmentDay, startTime, endTime, parseInt(parallelVaccinations), parseInt(timeIntervalInMinutes), newAppointmentInterval);
        this.pullOutOfWaitingList(newAppointmentsDay);
        appointmentDays.push(newAppointmentsDay);
        FileHandling_1.default.writeFile("/data/appointments.json", appointmentDays);
        ConsoleHandling_1.default.printInput("Congratulations! You successfully created some appointments on " + appointmentDay);
        Admin_1.default.goNext();
    }
    pullOutOfWaitingList(_newAppointmentsDay) {
        let counter = 0;
        let waitingList = FileHandling_1.default.readArrayFile("/data/waitingList.json");
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
    confirmAppointmentPerEmail(_eMail) {
        ConsoleHandling_1.default.printInput("To confirm the registration for an appointment an Email has been send to " + _eMail + ".");
    }
}
exports.AppointmentFactory = AppointmentFactory;
//# sourceMappingURL=AppointmentFactory.js.map