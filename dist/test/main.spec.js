"use strict";

var mocha = require("mocha");
var expect = require("chai").expect;
var app = require("../main");

describe("Todo app main test", function () {
    it("Should check if app exists", function () {
        expect(app).to.exist;
    });
});