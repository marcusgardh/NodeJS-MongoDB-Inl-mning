const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/edit/:id", async (req, res) => {
    let text = await ToDo.findOne({_id : req.params.id}).select({text: 1});
    res.render("edit", {title: "Redigera", text: text});
})

router.post("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let updatedText = req.body.todo;

    await ToDo.updateOne({_id: id}, {$set: {text: updatedText}});

    res.redirect("/");
})

module.exports = router;