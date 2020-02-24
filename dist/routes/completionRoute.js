"use strict";

var express = require("express");

var ToDo = require("../model/ToDo");

var router = express.Router();

router.get("/complete/:sort/:page/:id", async function (req, res) {
    var id = req.params.id;
    var sort = req.params.sort;
    var page = req.params.page;

    var toDo = await ToDo.findOne({ _id: id }).select({ isCompleted: 1 });

    if (toDo.isCompleted) {
        await ToDo.updateOne({ _id: id }, { $set: { isCompleted: false } });
    } else {
        await ToDo.updateOne({ _id: id }, { $set: { isCompleted: true } });
    }

    await res.redirect("/?sort=" + sort + "&page=" + page);
});

module.exports = router;