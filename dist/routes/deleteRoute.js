"use strict";

var express = require("express");

var ToDo = require("../model/ToDo");

var router = express.Router();

router.get("/delete/:sort/:page/:id", async function (req, res) {
    await ToDo.deleteOne({ _id: { $eq: req.params.id } });

    var sort = req.params.sort;
    var page = req.params.page;

    res.redirect("/?sort=" + sort + "&page=" + page);
});

module.exports = router;