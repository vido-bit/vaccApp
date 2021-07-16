"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandling = void 0;
const fs_1 = require("fs");
const fs_2 = require("fs");
const path_1 = require("path");
class FileHandling {
    static _instance = new FileHandling();
    constructor() {
        if (FileHandling._instance)
            throw new Error("Use FileHandling.getInstance() instead new FileHandling");
        FileHandling._instance = this;
    }
    static getInstance() {
        return FileHandling._instance;
    }
    readArrayFile(pathToFile) {
        return this.readFile(pathToFile);
    }
    // public readObjectFile(pathToFile: string): any {
    //     return this.readFile(pathToFile);
    // }
    writeFile(pathToFile, dataToWrite) {
        fs_2.writeFileSync(path_1.resolve(__dirname, "../" + pathToFile), JSON.stringify(dataToWrite));
    }
    readFile(pathToFile) {
        let jsonRaw = fs_1.readFileSync(path_1.resolve(__dirname, "../" + pathToFile));
        let json = JSON.parse(jsonRaw.toString());
        return json;
    }
}
exports.FileHandling = FileHandling;
exports.default = FileHandling.getInstance();
//# sourceMappingURL=FileHandling.js.map