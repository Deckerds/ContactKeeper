const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get contact data
// @access  Private

router.get('/', (req, res) => {
    res.send('Get Contacts Data');
});

// @route   POST api/contacts
// @desc    Add contact data
// @access  Private

router.post('/', (req, res) => {
    res.send('Add contact data');
});

// @route   PUT api/contacts/:id
// @desc    Update contact data
// @access  Private

router.put('/:id', (req, res) => {
    res.send('Update contact data');
});

// @route   DELETE api/contacts
// @desc    Delete contact data
// @access  Private

router.delete('/:id', (req, res) => {
    res.send('Delete contact data');
});

module.exports = router;