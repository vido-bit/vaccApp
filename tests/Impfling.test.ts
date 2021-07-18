import Validator from "../src/Validator";

// let testDate: Date = new Date("22-08-2021");
// console.log(testDate);

describe("This is a simple unit test", () => {
    test("Check the Email function", () => {
        expect(Validator.isValidEmail("karl.lauterbach@gesundheitsministerium.de")).toBe(true);
    });
});