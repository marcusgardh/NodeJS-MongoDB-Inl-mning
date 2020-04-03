"use strict";

var express = require("express");
var mongoose = require("mongoose");

var app = express();

var editRoute = require("./routes/editRoute");
var deleteRoute = require("./routes/deleteRoute");
var completionRoute = require("./routes/completionRoute");
var ToDo = require("./model/ToDo");
var databaseURL = process.env.MONGO_ATLAS_URL;
var options = { useNewUrlParser: true, useUnifiedTopology: true };
var port = process.env.PORT || 8000;
var path = require("path");

if (databaseURL == undefined) {
    try {
        databaseURL = require("./config/config");
    } catch (exception) {
        console.log("could not load local config file", exception.message);
    }
}

if (process.env.NODE_ENV == "production") {
    var sassMiddleware = require("node-sass-middleware");

    app.use(sassMiddleware({
        src: "sass",
        dest: "public",
        debug: true,
        outputStyle: "compressed"
    }));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(editRoute);
app.use(deleteRoute);
app.use(completionRoute);

app.get("/", async function (req, res) {
    var toDoArray = [];

    var page = req.query.page;

    if (!page || page <= 0) {
        page = 1;
    }

    var toDosPerPage = 9;

    var sort = req.query.sort;
    if (!sort) {
        sort = 1;
    }

    if (sort != -1 && sort != 1) {
        sort = 1;
    }

    var toDoList = await ToDo.find({
        // name: "Skor"
    }).sort({ date: sort }).skip(toDosPerPage * page - toDosPerPage).limit(toDosPerPage).select({ text: 1, date: 1, isCompleted: 1 });

    toDoArray = toDoList;

    res.render("index", { title: "Att göra", array: toDoArray, queries: { sort: sort, page: page } });
});

app.get("/about/:sort/:page", function (req, res) {
    var sort = req.params.sort;
    var page = req.params.page;

    res.render("about", { title: "About", queries: { sort: sort, page: page } });
});

app.post("/", async function (req, res) {
    var newToDo = req.body.todo;
    var sort = req.query.sort;
    var page = req.query.page;

    var toDo = new ToDo({
        text: newToDo
    });

    await toDo.save(function (error, success) {
        if (error) {
            res.send(error._message);
        } else {
            res.redirect("/?sort=" + sort + "&page=" + page);
        }
    });
});

mongoose.connect(databaseURL, options).then(function () {
    app.listen(port);
}).catch(function (e) {
    console.log(e);
});

module.exports = app;