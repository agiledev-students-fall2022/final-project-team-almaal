const express = require('express')
const router = express.Router()


// define the profile page route
router.get('/', (req, res) => {
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

module.exports = router