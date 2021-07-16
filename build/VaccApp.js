"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccApp = void 0;
const Admin_1 = require("./Admin");
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
    showMethods() {
        //let answer: String;
        Admin_1.Admin.getInstance().login();
    }
}
exports.VaccApp = VaccApp;
exports.default = VaccApp.getInstance();
//# sourceMappingURL=VaccApp.js.map