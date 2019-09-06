const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('\API running\n')
})

//routes

const actionsRouter = require('./actionsRouter')
const projectsRouter = require('./projectsRouter')

// global middleware
server.use(express.json())

// local middleware
server.use('/actions', actionsRouter)
server.use('/projects', projectsRouter)

module.exports = server;