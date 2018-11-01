const express = require('express')
const knex = require('knex')
const dbEngine = process.env.DB || 'development';
const knexConfig = require('../knexfile.js')[dbEngine];

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

router.route('/:id')
  .delete((req, res) => {
    const { id } = req.params
    db('notes')
      .where({ id })
      .delete(id)
      .then(deletedNote => {
        if (!deletedNote || deletedNote < 1) return res.status(404).json({ error: 'The specified note could not be found.' })
        return res.status(202).json(deletedNote)
      })
      .catch(err => res.status(500).json({ error: 'The specified note could not be deleted.' }))
  })

router.route('/:id/edit')
  .put((req, res) => {
    const { id } = req.params
    const changedNote = req.body
    db('notes')
      .where({ id })
      .update(changedNote)
      .then(changedNote => {
        if (!changedNote || changedNote < 1) return res.status(404).json({ error: 'The specific note could not be found.' })
        return res.status(200).json(changedNote)
      })
      .catch(err => res.status(500).json({ error: 'The specified note could not be updated.' }))
  })

module.exports = router
