const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/auth
// @desc    Auth user get Token
// @access  Public

router.post('/', [
    // email must be an email
    body('email', 'Must be a Valid Email Address').isEmail(),
    // password must be at least 6 chars long
    body('password', 'Password Must be more than 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).send({ msg: 'User Not Found' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send({ msg: 'Invalid Credentials' });
        }
        let payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;