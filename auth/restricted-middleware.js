const jwt = require('jsonwebtoken')
// const secret = require('../config/secrets.js')

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    try {
    
        if (authorization) {
            const secret = process.env.JWT_SECRET || 'shhhh';
            jwt.verify(authorization, secret, (error, decodedToken) => {
                if (error) {
                    res.status(401).json({ message: 'No Access' })
                } else {
                    req.token = decodedToken
                    next();
                }
            })
        } else {
            res.json({ message: 'Invalid authorization' })
        }
    }
    catch  {
        res.status(401).json({ message: 'Please Login' })
    }
}