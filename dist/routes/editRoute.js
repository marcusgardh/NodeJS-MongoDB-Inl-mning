"use strict";

var express = require("express");

var ToDo = require("../model/ToDo");

var router = express.Router();

router.get("/edit/:sort/:page/:id", async function (req, res) {
    var text = (await ToDo.findOne({ _id: req.params.id }).select({ text: 1 })) || null;
    res.render("edit", { title: "Redigera", text: text });
});

router.post("/edit/:sort/:page/:id", async function (req, res) {
    var id = req.params.id;
    var updatedText = req.body.todo;
    var sort = req.params.sort;
    var page = req.params.page;

    await ToDo.updateOne({ _id: id }, { $set: { text: updatedText } }, { runValidators: true }, function (error, success) {
        if (error) {
            res.send(error._message);
        } else {
            res.redirect("/?sort=" + sort + "&page=" + page);
        }
    });

    // res.redirect("/");
});

module.exports = router;