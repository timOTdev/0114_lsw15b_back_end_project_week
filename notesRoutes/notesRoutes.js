const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)

router.route('/')
  .get((req, res) => {
    db('notes')
      .then(notes => res.status(200).json(notes))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any notes.' }))
  })
  .post((req, res) => {
    const note = req.body
    db.insert(note)
      .into('notes')
      .then(note => res.status(201).json(note))
      .catch(err => res.status(500).json({ error: 'The note could not be added.' }))
  })

module.exports = router