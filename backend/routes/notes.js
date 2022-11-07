const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("./../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { update } = require("./../models/Notes");

// 1) Route : Fetch all Notes for a user, Login Require

router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const allNotes = await Notes.find({ user: req.user.id });
        res.json(allNotes);
    } catch (error) {
        res.status(400).send("Internal Server error");
    }
});

// 2) Route : Creating Notes for a user, Login Require

router.post(
    "/addnotes",
    [
        //Validation for the fields,
        body("title", "Title should have minimum 3 characters").isLength({
            min: 3,
        }),
        body(
            "description",
            "description should have minimum 3 characters"
        ).isLength({ min: 5 }),
    ],
    fetchUser,
    async (req, res) => {
        const errors = validationResult(req);

        // if Error exists during validation
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            try {
                const { title, description, tag, date } = req.body;
                const createNotes = new Notes({
                    title,
                    description,
                    tag,
                    date,
                    user: req.user.id,
                });
                let savedNotes = await createNotes.save();
                res.json(savedNotes);
            } catch (error) {
                res.status(400).send("Internal Server error");
            }
        }
    }
);

//3 ) Update the note for a user, Login Require

router.put("/updatenotes/:id", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not Found Notes");
        }
        if (notes.user != req.user.id) {
            return res.status(401).send("Access Denied");
        }
        const { title, description, tag, date } = req.body;
        const updateFeilds = {};
        if (title) {
            updateFeilds.title = title;
        }
        if (description) {
            updateFeilds.description = description;
        }
        if (title) {
            updateFeilds.tag = tag;
        }
        if (title) {
            updateFeilds.date = date;
        }
        const updatedNotes = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: updateFeilds },
            { new: true }
        );
        console.log("Updated SuccessFully");
        res.json(updatedNotes);
    } catch (error) {
        res.status(400).send("Internal Server error");
    }
});

// 4) Update the note for a user, Login Require

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not Found");
        }
        if (notes.user != req.user.id) {
            return res.status(401).send("Access Denied");
        }

        const updatedNotes = await Notes.findByIdAndDelete(
            req.params.id,
        );
        console.log("Deleted SuccessFully");
        res.json(updatedNotes);
    } catch (error) {
        res.status(400).send("Internal Server error");
    }
});

module.exports = router;
