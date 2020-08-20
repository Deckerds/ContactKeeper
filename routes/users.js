const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post('/', [
    // username must not be an empty
    body('name', 'Username is Required').not().isEmpty(),
    // email must be an email
    body('email', 'Must be a Valid Email Address').isEmail(),
    // password must be at least 6 chars long
    body('password', 'Password Must be more than 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User Already Exists' });
        };

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    };

});

module.exports = router;