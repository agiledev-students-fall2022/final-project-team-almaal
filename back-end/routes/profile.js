const express = require('express')
const router = express.Router()


// define the profile page route
router.get('/', async (req, res) => {
    const response = {
        username: "@frankwu2002",
        password: "fakepassword",
        investment_visibility: false,
        profile_visibility: false,
        total_friends: 10,
        total_groups: 7,
        total_invested: "$5000",
        total_profit: "+10.5%"
    }
    res.status(200).json(response)
})

// logout route
router.get('/logout', async (req, res) => {
    res.status(200).redirect('/login')
})

// update profile information
router.post('/update', async (req, res) => {
    const response = {}

    if (req.body.username) {
        response.username = req.body.username
    }
    if (req.body.password) {
        response.password = req.body.password
    }
    if (req.body.investment_visibility) {
        response.investment_visibility = req.body.investment_visibility
    }
    if (req.body.profile_visibility) {
        response.profile_visibility = req.body.profile_visibility
    }
    res.status(200).json(response)
})

module.exports = router