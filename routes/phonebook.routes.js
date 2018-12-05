const express = require('express')
const router = express.Router()
const phonebook = require('../models/phonebook.model')
const m = require('../helpers/middlewares')
// Routes
module.exports = router

// Get all phonebooks
router.get('/', async (req, res) => {
    await phonebook.getPhonebooks()
    .then(phonebooks => res.json(phonebooks))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A phonebook by number */
router.get('/:number', async (req, res) => {
    const number = req.params.number
    await phonebook.getPhonebook(number)
    .then(phonebook => res.json(phonebook))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new phonebook */
router.post('/', m.checkFieldsPhonebook, async (req, res) => {
    await phonebook.insertPhonebook(req.body)
    .then(phonebook => res.status(201).json({
        message: `The phonebook #${phonebook.number} has been created`,
        content: phonebook
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a phonebook */
router.put('/:number', m.checkFieldsPhonebook, async (req, res) => {
    const number = req.params.number
    await phonebook.updatePhonebook(number, req.body)
    .then(phonebook => res.json({
        message: `The phonebook #${number} has been updated`,
        content: phonebook
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a phonebook */
router.delete('/:number', async (req, res) => {
    const number = req.params.number
    
    await phonebook.deletePhonebook(number)
    .then(post => res.json({
        message: `The phonebook #${number} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})