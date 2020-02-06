const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let toDoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: Boolean
})

let ToDo = mongoose.model("todo", toDoSchema);

module.exports = ToDo;