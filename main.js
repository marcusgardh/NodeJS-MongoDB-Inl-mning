const express = require("express");
const mongoose = require("mongoose");

const app = express();

const editRoute = require("./routes/editRoute");
const deleteRoute = require("./routes/deleteRoute");
const completionRoute = require("./routes/completionRoute");
const ToDo = require("./model/ToDo");
const databaseURL = process.env.MONGO_ATLAS_URL;
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const port = process.env.PORT || 8000;
const path = require("path");

if (databaseURL == undefined) {
    try {
        databaseURL = require("./config/config");
    } catch (exception) {
        console.log("could not load local config file", exception.message);
    }
}

if (process.env.NODE_ENV == "development") {
    const sassMiddleware = require("node-sass-middleware");

    app.use(sassMiddleware({
        src: "sass",
        dest: "public",
        debug: true,
        outputStyle: "compressed"
    }))
}

app.use(express.urlencoded({extended: true}));
app.use(express.static("/public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(editRoute);
app.use(deleteRoute);
app.use(completionRoute);

app.get("/", async (req, res) => {
    let toDoArray = [];
    
    let page = req.query.page;

    if (!page || page <= 0) {
        page = 1;
    }

    const toDosPerPage = 9;

    let sort = req.query.sort;
    if (!sort) {
        sort = 1;
    }

    if (sort != -1 && sort != 1) {
        sort = 1;
    }

    let toDoList  = await ToDo.find({
        // name: "Skor"
    }).sort({date: sort})
    .skip(((toDosPerPage * page) - toDosPerPage))
    .limit(toDosPerPage)
    .select({text: 1, date: 1, isCompleted: 1});

    toDoArray = toDoList;

    res.render("index", {title: "Att göra", array: toDoArray, queries: {sort, page}});
})

app.get("/about/:sort/:page", (req, res) => {
    let sort = req.params.sort;
    let page = req.params.page;

    res.render("about", {title: "About", queries: {sort: sort, page: page}});
})

app.post("/", async (req, res) => {
    let newToDo = req.body.todo;
    let sort = req.query.sort;
    let page = req.query.page;

    let toDo = new ToDo({
        text : newToDo
    })

    await toDo.save((error, success) => {
        if (error) {
            res.send(error._message);
        }
        else {
            res.redirect("/?sort=" + sort + "&page=" + page);
        }
    });
})

mongoose
.connect(databaseURL, options)
.then(() => {
    app.listen(port);
}).catch((e) => {
    console.log(e);
})

module.exports = app;