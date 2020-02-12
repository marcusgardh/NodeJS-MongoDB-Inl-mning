const express = require("express");

const ToDo = require("../model/ToDo");

const router = express.Router();

router.get("/complete/:sort/:page/:id", async (req, res) => {
    let id = req.params.id;
    let sort = req.params.sort;
    let page = req.params.page;

    let toDo = await ToDo.findOne({_id : id}).select({isCompleted: 1});

    if (toDo.isCompleted) {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: false}});
    }
    else {
        await ToDo.updateOne({_id: id}, {$set: {isCompleted: true}});   
    }

    await res.redirect("/?sort=" + sort+ "&page=" + page);
})

module.exports = router;