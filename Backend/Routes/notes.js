const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../Models/Notes');
const fetchuser = require('../Middleware/fetchuser');

// Add a note using POST req "/api/notes/addNote"
router.post('/addNote',
    fetchuser,
    [
        body('title', 'Title is required').isLength({ min: 5 }),
        body('description', 'Description is required').isLength({ min: 10 }),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;
            const note = new Notes({
                user: req.user.id,
                title,
                description,
                tag
            });

            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
);

// Route 2: Get req to get all the notes of the respective user

router.get('/getAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


// Route 3: Update an existing note using PUT req "/api/notes/updateNote/:id"
router.put('/updateNote/:id',
    fetchuser,
    [
        body('title', 'Title is required').isLength({ min: 1 }),
        body('description', 'Description is required').isLength({ min: 1 }),
        body('tag').optional().isLength({ min: 1 }),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        try {
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Note not found");
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Authorized");
            }
            // Update the note
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );

            res.json(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Internal Server Error" });
        }

    })
module.exports = router;

