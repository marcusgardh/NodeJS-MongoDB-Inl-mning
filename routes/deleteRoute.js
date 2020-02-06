const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/delete/:id", async (req, res) => {
    await ToDo.deleteOne({_id: {$eq: req.params.id}});

    res.redirect("/");
})

module.exports = router;