const express = require('express')

const router = express.Router()

const Users = require("./user-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require('../auth/check-role-middleware.js');


router.get('/', restricted, checkRole(1), async (req, res) => {
    try {
        const found = await Users.find()
        if (found) {
            res.status(200).json(found)
        } else {
            res.status(401).json('No User to Display')
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router