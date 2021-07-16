"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
class ConsoleHandling {
    static _instance = new ConsoleHandling();
    line = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    constructor() {
        if (ConsoleHandling._instance)
            throw new Error("Use ConsoleHandling.getInstance() instead new ConsoleHandling()");
        ConsoleHandling._instance = this;
    }
    static getInstance() {
        return ConsoleHandling._instance;
    }
    printInput(input) {
        this.line.write(input);
        this.line.write("\n");
    }
    closeConsole() {
        this.line.close();
    }
}
exports.default = ConsoleHandling.getInstance();
//# sourceMappingURL=ConsoleHandler.js.map