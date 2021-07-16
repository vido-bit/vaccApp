import { Admin } from "./Admin";
import { Impfling } from "./Impfling";
import { ConsoleHandling } from "./ConsoleHandling";

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

    public showMethods(): void {
        //let answer: String;

        Admin.getInstance().login();
    }

    // if("termine frei") {
    //     answer = await ConsoleHandling.getInstance().showPossibilities(["(1) show Days with free appointments", "(2) Search for a specific Day", "(3) Login as Admin"], "Please type in the number of the function you want to use");
    //     switch (answer) {
    //         case "1":
    //             Impfling.getInstance().showDayswithFreeAppointments();
    //             break;
    //         case "2":
    //             Impfling.getInstance().searchSpecificDay();
    //             break;
    //         case "3":
    //             Admin.getInstance().login();
    //             break;
    //     }
    // }
    // if("No appointments available") {
    //     answer = await ConsoleHandling.getInstance().showPossibilities(["(1) register in waiting list", "(2) Login as Admin"], "Please type in the number of the function you want to use");
    //     switch (answer) {
    //         case "1":
    //             Impfling.getInstance().registerInWaitingList();
    //             break;
    //         case "2":
    //             Admin.getInstance().login();
    //             break;

}

export default VaccApp.getInstance();







