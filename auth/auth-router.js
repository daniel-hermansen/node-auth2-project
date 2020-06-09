const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require("../users/user-model.js");



router.post('/Register', async (req, res) => {
    const user = req.body
    const hash = bcryptjs.hashSync(user.password, 10)
    user.password = hash
    try {
        const newUser = await Users.addUser(user)
        if (newUser) {
            res.status(201).json('New User added')

        } else {
            res.status(404).json('Unable to add new User')
        }
    }
    catch{
        res.status(500).json('Error with Database')
    }
})



router.post('/Login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await Users.findBy({ username }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
           
            const token = generateToken(user)
            res.status(200).json({ message: `Welcome ${user.username}`, token })
        } else {
            res.status(401).json({ message: 'Invalid Cred' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: "2m"
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
}