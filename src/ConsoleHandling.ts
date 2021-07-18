import * as readline from "readline";

export class ConsoleHandling {
    private static _instance: ConsoleHandling = new ConsoleHandling();
    private line: readline.ReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    constructor() {
        if (ConsoleHandling._instance)
            throw new Error("Use ConsoleHandling.getInstance() instead new ConsoleHandling()");
        ConsoleHandling._instance = this;
    }

    public static getInstance(): ConsoleHandling {
        return ConsoleHandling._instance;
    }

    public question(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.line.question(question.toString(), (_answer: string) => {
                resolve(_answer);
            });
        });
    }

    public showPossibilities(showPossibilities: String[], question: String): Promise<String> {
        this.line.write("\n");
        for (let possibility of showPossibilities) {
            this.line.write(possibility.toString());
            this.line.write("\n");
        }
        this.line.write("\n");

        return new Promise((resolve) => this.line.question(question.toString(), (answer: string) => {
            resolve(answer);
        }));
    }

    public printInput(input: string): void {
        this.line.write(input);
        this.line.write("\n");
    }

    public closeConsole(): void {
        this.line.close();
    }


}
export default ConsoleHandling.getInstance();