const express = require('express')
const helmet = require('helmet')
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const notesRoutes = require('./notesRoutes/notesRoutes.js');
const authRoutes = require('./authRoutes/authRoutes.js');
const server = express()
const db = knex(knexConfig.development)

// PASSPORT CONFIG
// server.use(passport.initialize());
// server.use(passport.session());
passport.use(new LocalStrategy(
  function (username, password, cb) {
    db("users")
      .where({ username })
      .then(user => res.status(200).json({ message: 'success' }))
    // db.users.findByUsername(username, function (err, user) {
    //   if (err) { return cb(err); }
    //   if (!user) { return cb(null, false); }
    //   if (user.password != password) { return cb(null, false); }
    //   return cb(null, user);
    // });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// STANDARD CONFIG
server.use(helmet())
server.use(cors());
server.use(express.json())
server.use(passport.initialize());
server.use(passport.session());

// ROUTES
server.use('/', authRoutes)
server.use('/notes', notesRoutes)

server.listen(9000, () => console.log('\nAPI running on 9k\n'))