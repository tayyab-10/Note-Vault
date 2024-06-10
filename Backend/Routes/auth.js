const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User');

const JWT_SECRET = 'Never Fall in love at your Early twenties'; // Replace with your actual secret key

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
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Hash and salt the password
        const { name, password, email } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user with the hashed password
            const user = new User({
                name,
                password: hashedPassword,
                email
            });

            // Save the user to the database
            await user.save();

            // Generate a JWT
            const payloaddata = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(payloaddata, JWT_SECRET, { expiresIn: '1h' });

            // Return the JWT to the client
            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;
