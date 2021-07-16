import { Impfling } from "../src/Impfling";

// let testDate: Date = new Date("22-08-2021");
// console.log(testDate);

let impfling: Impfling = Impfling.getInstance();

describe("This is a simple unit test", () => {
    test("Check the Email function", () => {
        expect(impfling.isValidEmail("karl.lauterbach@gesundheitsministerium.de")).toBe(true);
    });
});