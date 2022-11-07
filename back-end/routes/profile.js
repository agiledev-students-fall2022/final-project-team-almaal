const express = require('express')
const router = express.Router()


// define the profile page route
router.get('/', async (req, res) => {
    const response = {
        username: "@frankwu2002",
        password: "********",
        investment_visibility: true,
        hide_profile: false,
        total_friends: 10,
        total_groups: 7,
        total_invested: "$5000",
        total_proflie: "+10.5%"
    }
    res.json(response)
})

// logout route
router.get('/logout',async (req,res) => {
    res.redirect('/login')
})

// update profile information
router.post('/update', async (req,res) => {
    const response = {}

    if(req.body.username){
        response.username = req.body.username
    }
    if(req.body.password){
        response.password = req.body.username
    }
    if(req.body.investment_visibility){
        response.investment_visibility = req.body.investment_visibility
    }
    if(req.body.hide_profile){
        response.hide_profile = req.body.hide_profile
    }
    res.status(200).json(response)
})

module.exports = router