const mocha = require("mocha");
const expect = require("chai").expect;
const app = require("../main");

describe("Todo app main test", () => {
    it("Should check if app exists", () => {
        expect(app).to.exist;
    })

})