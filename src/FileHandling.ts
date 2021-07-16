import { readFileSync } from "fs";
import { writeFileSync } from "fs";
import { resolve } from "path";

export class FileHandling {

    private static _instance: FileHandling = new FileHandling();

    private constructor() {
        if (FileHandling._instance)
            throw new Error("Use FileHandling.getInstance() instead new FileHandling");
        FileHandling._instance = this;
    }

    public static getInstance(): FileHandling {
        return FileHandling._instance;
    }

    public readArrayFile(pathToFile: string): Array<any> {
        return this.readFile(pathToFile);
    }

    // public readObjectFile(pathToFile: string): any {
    //     return this.readFile(pathToFile);
    // }

    public writeFile(pathToFile: string, dataToWrite: any): void {
        writeFileSync(resolve(__dirname, "../" + pathToFile), JSON.stringify(dataToWrite, null, 20));
    }

    private readFile(pathToFile: string): any {
        let jsonRaw: Buffer = readFileSync(resolve(__dirname, "../" + pathToFile));
        let json: any = JSON.parse(jsonRaw.toString());
        return json;
    }


}

export default FileHandling.getInstance();