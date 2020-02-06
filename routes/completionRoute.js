const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/complete/:id", async (req, res) => {
    let id = req.params.id;

    let toDo = await ToDo.findOne({_id : id}).select({isCompleted: 1});

    if (toDo.isCompleted) {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: false}});
    }
    else {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: true}});   
    }

    res.redirect("/");
})

module.exports = router;