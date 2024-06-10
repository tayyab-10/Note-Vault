const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../Models/User');

// Creating a user using the POST req "/api/auth"
router.post(
    '/',
    [
        // Validation rules
        body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
        body('email').isEmail().withMessage('Email is not valid')
    ],
    (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If no validation errors, proceed to create the user
        const user = new User(req.body);
        user.save()
            .then(() => res.json({ message: 'User created successfully!' }))
            .catch(err => res.status(400).json({ error: err.message }));
    }
);

module.exports = router;
