"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleHandling = void 0;
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
    question(question) {
        return new Promise((resolve) => {
            this.line.question(question.toString(), (_answer) => {
                resolve(_answer);
            });
        });
    }
    showPossibilities(showPossibilities, question) {
        this.line.write("\n");
        this.line.write("Functions you can use: ");
        this.line.write("\n\n");
        for (let possibility of showPossibilities) {
            this.line.write(possibility.toString());
            this.line.write("\n");
        }
        this.line.write("\n");
        return new Promise((resolve) => this.line.question(question.toString(), (answer) => {
            resolve(answer);
        }));
    }
    printInput(input) {
        this.line.write(input);
        this.line.write("\n");
    }
    closeConsole() {
        this.line.close();
    }
}
exports.ConsoleHandling = ConsoleHandling;
exports.default = ConsoleHandling.getInstance();
//# sourceMappingURL=ConsoleHandling.js.map