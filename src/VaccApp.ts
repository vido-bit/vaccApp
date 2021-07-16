import { Admin } from "./Admin";
import { Impfling } from "./Impfling";
import { ConsoleHandling } from "./ConsoleHandling";
import FileHandling from "./FileHandling";
import { AppointmentDay } from "./AppointmentDay";

export class VaccApp {
    public static impfling: Impfling;
    public static admin: Admin;

    private static _instance: VaccApp = new VaccApp();

    private constructor() {
        if (VaccApp._instance)
            throw new Error("Use VaccApp.getInstance() instead new VaccApp");
        VaccApp._instance = this;
    }

    public static getInstance(): VaccApp {
        return VaccApp._instance;
    }

    public async chooseRole(): Promise<void> {
        let answer: string;
        answer = <string>await ConsoleHandling.getInstance().showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use");
        switch (answer) {
            case "1":
                this.showMethods();
                break;
            case "2":
                Admin.getInstance().login();
                break;
        }
    }

    public async showMethods(): Promise<void> {

        // Admin.getInstance().login();
        let answer: string;
        let appointmentsArray: AppointmentDay[] = FileHandling.readArrayFile("/data/appointments.json");
        let amountOfAvailableAppointments: number = 0;
        console.log(appointmentsArray[0].parallelAppointmentInterval[0]);
        appointmentsArray.forEach(day => {
            day.parallelAppointmentInterval.forEach(interval => {
                interval.parallelAppointments.forEach(appointment => {
                    if (appointment.isAvailable == true)
                        amountOfAvailableAppointments++;
                });
            });
        });
        console.log("methode // showMethods");
        if (amountOfAvailableAppointments > 0) {
            answer = <string>await ConsoleHandling.getInstance().showPossibilities(["(1) show Days with free appointments", "(2) Search for a specific Day"], "Please type in the number of the function you want to use");
            switch (answer) {
                case "1":
                    Impfling.getInstance().showDayswithFreeAppointments();
                    break;
                case "2":
                    Impfling.getInstance().searchSpecificDay();
                    break;
            }
        }
        else {
            answer = <string>await ConsoleHandling.getInstance().showPossibilities(["Unfortunately there are no free appointments available at this Moment. Would you like to register in waiting list?"], "y/n)");
            switch (answer) {
                case "y":
                    Impfling.getInstance().registerInWaitingList();
                    break;
                case "n":
                    ConsoleHandling.getInstance().closeConsole();
                    break;
            }
        }
    }
}
export default VaccApp.getInstance();







