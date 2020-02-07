const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/complete/:sort/:id", async (req, res) => {
    let id = req.params.id;
    let sort = req.params.sort;

    let toDo = await ToDo.findOne({_id : id}).select({isCompleted: 1});

    if (toDo.isCompleted) {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: false}});
    }
    else {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: true}});   
    }

    res.redirect("/?sort=" + sort);
})

module.exports = router;