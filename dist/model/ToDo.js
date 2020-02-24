"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

var ToDo = mongoose.model("todo", toDoSchema);

module.exports = ToDo;