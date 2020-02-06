const express = require("express");
const mongoose = require("mongoose");

const app = express();

const editRoute = require("./routes/editRoute");
const deleteRoute = require("./routes/deleteRoute");
const ToDo = require("./model/ToDo");
const config = require("./config/config");
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(editRoute);
app.use(deleteRoute);

app.get("/", async (req, res) => {
    let toDoArray = [];
    let toDoList  = await ToDo.find({
        // name: "Skor"
    })
    // .limit(2)
    .select({text: 1, isCompleted: 1});

    toDoArray = toDoList;

    res.render("index", {title: "Att göra", array: toDoArray});
})

app.post("/", async (req, res) => {
    let newToDo = req.body.todo;

    let toDo = new ToDo({
        text : newToDo,
        isCompleted: false
    })

    await toDo.save((error, success) => {
        if (error) {
            res.send(error._message);
        }
        else {
            res.redirect("/");
        }
    });
})

mongoose
.connect(config.databaseURL, config.options)
.then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port);
}).catch((e) => {
    console.log(e);
})