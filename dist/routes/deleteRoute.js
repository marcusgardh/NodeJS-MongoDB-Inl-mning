const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/delete/:sort/:page/:id", async (req, res) => {
    await ToDo.deleteOne({ _id: { $eq: req.params.id } });

    let sort = req.params.sort;
    let page = req.params.page;

    res.redirect("/?sort=" + sort + "&page=" + page);
});

module.exports = router;