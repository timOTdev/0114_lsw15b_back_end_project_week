require('dotenv').config();

const express = require('express')
const helmet = require('helmet')
const cors = require('cors');
const notesRoutes = require('./notesRoutes/notesRoutes.js');
const server = express()
const port = process.env.PORT || 9000;

server.use(helmet())
server.use(cors());
server.use(express.json())

server.get('/', (req, res) => res.send("It's Alive"))
server.use('/notes', notesRoutes)

server.listen(port, () => console.log(`\nAPI running on ${port}\n`))