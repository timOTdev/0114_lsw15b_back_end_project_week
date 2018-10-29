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

module.exports = router