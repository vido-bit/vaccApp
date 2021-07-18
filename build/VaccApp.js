"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccApp = void 0;
const Admin_1 = require("./Admin");
const Impfling_1 = require("./Impfling");
const ConsoleHandling_1 = require("./ConsoleHandling");
class VaccApp {
    static impfling;
    static admin;
    static _instance = new VaccApp();
    constructor() {
        if (VaccApp._instance)
            throw new Error("Use VaccApp.getInstance() instead new VaccApp");
        VaccApp._instance = this;
    }
    static getInstance() {
        return VaccApp._instance;
    }
    async chooseRole() {
        let answer;
        answer = await ConsoleHandling_1.default.showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use.");
        while (answer != "1" && answer != "2") {
            console.log("This was not a valid input! Please try again.");
            answer = await ConsoleHandling_1.default.showPossibilities(["(1) Do you want to search for a vaccination Appointment?", "(2) Log in as Admin"], "Please type the number of the function you want to use.");
        }
        switch (answer) {
            case "1":
                Impfling_1.Impfling.getInstance().showMethods();
                break;
            case "2":
                Admin_1.Admin.getInstance().login();
                break;
        }
    }
}
exports.VaccApp = VaccApp;
exports.default = VaccApp.getInstance();
//# sourceMappingURL=VaccApp.js.map