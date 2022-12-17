const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// define the home page route
router.get('/',auth, (req, res) => {
    res.send('News page')
})

module.exports = router