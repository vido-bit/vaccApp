import { Admin } from "./Admin";
import { Impfling } from "./Impfling";
import ConsoleHandling from "./ConsoleHandling";

export class VaccApp {
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
        answer = <string>await ConsoleHandling.showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use.");
        while (answer != "1" && answer != "2") {
            console.log("This was not a valid input! Please try again.");
            answer = <string>await ConsoleHandling.showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use.");
        }
        switch (answer) {
            case "1":
                Impfling.getInstance().showMethods();
                break;
            case "2":
                Admin.getInstance().login();
                break;
        }
    }
}
export default VaccApp.getInstance();







