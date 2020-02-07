const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/delete/:sort/:id", async (req, res) => {
    await ToDo.deleteOne({_id: {$eq: req.params.id}});

    let sort = req.params.sort;

    res.redirect("/?sort=" + sort);
})

module.exports = router;