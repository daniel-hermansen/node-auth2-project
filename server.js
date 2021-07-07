const express = require('express')
const userRouter = require('./users/user-router.js');
const authRouter = require("./auth/auth-router.js");


const server = express()

server.use(express.json())

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
    res.send('Server is Running.')
})

module.exports = server