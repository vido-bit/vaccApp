
import { AppointmentDay } from "./AppointmentDay";
import ConsoleHandling from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import { AppointmentFactory } from "./AppointmentFactory";
import VaccApp from "./VaccApp";
export class Admin {
    private static _instance: Admin = new Admin();
    constructor() {
        if (Admin._instance)
            throw new Error("Use Admin.getInstance() instead new Admin()");
        Admin._instance = this;
    }
    public static getInstance(): Admin {
        return Admin._instance;
    }

    public async login(): Promise<void> {
        let username: String = await ConsoleHandling.question("Username: ");
        if (username == "admin") {
            let password: String = await ConsoleHandling.question("password: ");
            if (password == "1234") {
                ConsoleHandling.printInput("\nHello admin! Nice to see you :)");
                this.showMethods();
            }
            else {
                ConsoleHandling.printInput("\nincorrect Password. Please try again");
                this.login();
            }
        }
        else {
            ConsoleHandling.printInput("\nincorrect Username. Please try again");
            this.login();
        }
    }
    public async showMethods(): Promise<void> {
        let answer: string;
        answer = <string>await ConsoleHandling.showPossibilities(["(1) Create appointments", "(2) Overview for a day", "(3) Statistics"], "Please type the number of the function you want to use.");
        while (answer != "1" && answer != "2" && answer != "3") {
            ConsoleHandling.printInput("\nThis is not a valif input! Please try again.");
            answer = <string>await ConsoleHandling.showPossibilities(["(1) Create appointments", "(2) Overview for a day", "(3) Statistics"], "Please type the number of the function you want to use.");
        }
        switch (answer) {
            case "1":
                AppointmentFactory.getInstance().createAppointments();
                break;
            case "2":
                this.showDayOverview();
                break;
            case "3":
                this.showStatistics();
        }
    }

    public async showDayOverview(): Promise<void> {
        let amountOfAvailableAppointments: number = 0;
        let amountOfOccupiedAppointments: number = 0;
        let amountOfAppointments: number = 0;
        let occupancyInPercent: number = 0;
        let availabilityInPercent: number = 0;
        let appointmentIsAvailable: boolean = false;
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");

        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    amountOfAppointments++;
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                    else (amountOfOccupiedAppointments++);
                });
            });
        });
        availabilityInPercent = (amountOfAvailableAppointments / amountOfAppointments) * 100;
        occupancyInPercent = (amountOfOccupiedAppointments / amountOfAppointments) * 100;

        ConsoleHandling.printInput("\nAppointments available: " + availabilityInPercent.toString().substring(0, 4) + "%");
        ConsoleHandling.printInput("Appointments occupied: " + occupancyInPercent.toString().substring(0, 4) + "%");
        appointmentsArray.forEach(day => {
            ConsoleHandling.printInput("\n" + day.date + "\n");
            day.parallelAppointmentInterval.forEach(interval => {
                amountOfAvailableAppointments = 0;
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true) {
                        amountOfAvailableAppointments++;
                        appointmentIsAvailable = true;
                    }
                });
                if (appointmentIsAvailable)
                    ConsoleHandling.printInput(interval.startTime + "(" + amountOfAvailableAppointments.toString() + ")");
                else ConsoleHandling.printInput(day.date + " (100% belegt)");
            });
        });
        this.goNext();
    }

    public async showStatistics(): Promise<void> {
        let appointmentsArray: AppointmentDay[] = await FileHandling.readArrayFile("/data/appointments.json");
        let dayOfToday: string = new Date().toJSON().substring(8, 10);
        console.log(dayOfToday);
        let monthOfToday: string = new Date().toJSON().substring(5, 7);
        console.log(monthOfToday);
        let yearOfToday: number = parseInt(new Date().toJSON());
        ConsoleHandling.printInput(yearOfToday.toString());

        let totalAppointments: number = 0;
        let totalAvailableAppointments: number = 0;
        let totalOccupiedAppointments: number = 0;
        let pastAppointments: number = 0;
        let pastAvailableAppointments: number = 0;
        let pastOccupiedAppointments: number = 0;
        let futureAppointments: number = 0;
        let futureAvailableAppointments: number = 0;
        let futureOccupiedAppointments: number = 0;

        appointmentsArray.forEach(day => {
            let thisDay: number = parseInt(day.date.substring(0, 3));
            let thisMonth: number = parseInt(day.date.substring(4, 6));
            let thisYear: number = parseInt(day.date.substring(6, 10));
            console.log(thisDay);
            console.log(thisMonth);
            console.log(thisYear);
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    totalAppointments++;
                    if (appointment.isAvailable == true) {
                        totalAvailableAppointments++;
                        if (thisYear < yearOfToday) {
                            pastAvailableAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth <= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay <= parseInt(dayOfToday)) {
                                pastAvailableAppointments++;
                                pastAppointments++;
                            }
                        if (thisMonth < parseInt(monthOfToday)) {
                            pastAvailableAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear > yearOfToday) {
                            futureAvailableAppointments++;
                            futureAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth >= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay > parseInt(dayOfToday)) {
                                futureAvailableAppointments++;
                                futureAppointments++;
                            }
                        if (thisMonth > parseInt(monthOfToday)) {
                            futureAvailableAppointments++;
                            futureAppointments++;
                        }
                    }
                    else {
                        totalOccupiedAppointments++;
                        if (thisYear < yearOfToday) {
                            pastOccupiedAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth <= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay <= parseInt(dayOfToday)) {
                                pastOccupiedAppointments++;
                                pastAppointments++;
                            }
                        if (thisMonth < parseInt(monthOfToday)) {
                            pastOccupiedAppointments++;
                            pastAppointments++;
                        }
                        if (thisYear > yearOfToday) {
                            futureOccupiedAppointments++;
                            futureAppointments++;
                        }
                        if (thisYear == yearOfToday && thisMonth >= parseInt(monthOfToday))
                            if (thisMonth == parseInt(monthOfToday) && thisDay > parseInt(dayOfToday)) {
                                futureOccupiedAppointments++;
                                futureAppointments++;
                            }
                        if (thisMonth > parseInt(monthOfToday)) {
                            futureOccupiedAppointments++;
                            futureAppointments++;
                        }
                    }
                });
            });
        });
        ConsoleHandling.printInput("Total Appointments: " + totalAppointments.toString());
        ConsoleHandling.printInput("  - in the future: " + futureAppointments);
        ConsoleHandling.printInput("  - in the past: " + pastAppointments);
        ConsoleHandling.printInput("Available Appointments: " + totalAvailableAppointments.toString());
        ConsoleHandling.printInput("  - in the future: " + futureAvailableAppointments.toString());
        ConsoleHandling.printInput("  - in the past: " + pastAvailableAppointments.toString());
        ConsoleHandling.printInput("Occupied Appointments: " + totalOccupiedAppointments.toString());
        ConsoleHandling.printInput("  - in the future: " + futureOccupiedAppointments.toString());
        ConsoleHandling.printInput("  - in the past: " + pastOccupiedAppointments.toString());

        this.goNext();
    }

    public async goNext(): Promise<void> {
        let goNext: string;
        goNext = <string>await ConsoleHandling.showPossibilities(["(1) back to admin menu", "(2) logout", "(3) close console"], "Please type in the number of the function you want to use: ");
        while (goNext != "1" && goNext != "2" && goNext != "3") {
            ConsoleHandling.printInput("\nThis is not a valid input! Please try again.");
            goNext = <string>await ConsoleHandling.showPossibilities(["(1) back to admin menu", "(2) logout", "(3) close console"], "Please type in the number of the function you want to use: ");
        }
        switch (goNext) {
            case "1":
                this.showMethods();
                break;
            case "2":
                VaccApp.chooseRole();
                break;
            case "3":
                ConsoleHandling.closeConsole();
        }
    }
}
export default Admin.getInstance();