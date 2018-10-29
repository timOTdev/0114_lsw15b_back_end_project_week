const express = require('express')
const helmet = require('helmet')
const cors = require('cors');
const notesRoutes = require('./notesRoutes/notesRoutes.js');
const server = express()

server.use(helmet())
server.use(cors());
server.use(express.json())

server.get('/', (req, res) => res.send("It's Alive"))
server.use('/notes', notesRoutes)

server.listen(9000, () => console.log('\nAPI running on 9k\n'))