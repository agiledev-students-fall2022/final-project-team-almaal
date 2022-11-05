const express = require('express')
const router = express.Router()
// define the home page route
router.get('/', (req, res) => {
    res.send('Profile page')
})

module.exports = router