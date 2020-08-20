const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get contact data
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ data: -1 });
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST api/contacts
// @desc    Add contact data
// @access  Private

router.post('/', [auth, [
    // username must not be an empty
    body('name', 'Username is Required').not().isEmpty(),
    // email must be an email
    body('email', 'Must be a Valid Email Address').isEmail()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contacts = await newContact.save();
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   PUT api/contacts/:id
// @desc    Update contact data
// @access  Private

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ msg: 'Contact Not Found' });
        }
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   DELETE api/contacts
// @desc    Delete contact data
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ msg: 'Contact Not Found' });
        }
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Deleted!' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;