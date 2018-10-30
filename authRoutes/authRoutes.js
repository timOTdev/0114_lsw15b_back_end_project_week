const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const db = knex(knexConfig.development)

// SESSION CONFIG
// const sessionConfig = {
//   secret: 'nobody-tosses.a%dwarf.!',
//   name: 'monkey', // defaults to connect.sid
//   httpOnly: true, // JS can't access this
//   resave: false,
//   saveUninitialized: false, // laws !
//   cookie: {
//     secure: false, // over httpS
//     maxAge: 1000 * 60 * 1,
//   },
// };
// server.use(session(sessionConfig));

// ROUTES
router.route('/')
  .get((req, res) => res.send("It's Alive"))

router.route('/register')
  .post((req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db('users')
      .insert(credentials)
      .then(ids => {
        const id = ids[0] || id;
        // req.session.username = user.username;
        res.status(201).json({ newUserId: id });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

router.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/login' }, (req, res) => {
    return res.redirect('/')
  })
  )
// app.get('/login',
// function(req, res){
//   res.render('login');
// });


module.exports = router
