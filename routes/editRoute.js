const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/edit/:sort/:id", async (req, res) => {
    let text = await ToDo.findOne({_id : req.params.id}).select({text: 1});
    res.render("edit", {title: "Redigera", text: text});
})

router.post("/edit/:sort/:id", async (req, res) => {
    let id = req.params.id;
    let updatedText = req.body.todo;
    let sort = req.params.sort

    await ToDo.updateOne({_id: id}, {$set: {text: updatedText}}, {runValidators: true}, (error, success) => {
        if (error) {
            res.send(error._message);
        }
        else {
            res.redirect("/?sort=" + sort);
        }
    });

    // res.redirect("/");
})

module.exports = router;