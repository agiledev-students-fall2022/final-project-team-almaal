const express = require('express')
const axios = require('axios')
const router = express.Router()
// define the home page rout

const getIncomingRequests = async () => {
    const response = await axios.get("https://randomuser.me/api?results=5");

    return response.data;
}

// view requests
router.get('/', async (req, res) => {
    const response = {}

    response.friendRequests = await getIncomingRequests();

    res.status(200).json(response);
})

// modify incoming requests
router.post('/modifyrequest', async (req, res) => {
    const response = {}

    if (req.body.action === "add") {
        response.message = "Friend Successfully Added!"
    } else if (req.body.action === "remove") {
        response.message = "Request Removed"
    }

    res.status(200).json(response);
})

// view all friends
router.get('/friendlist', async (req, res) => {
    const response = {}

    response.friendRequests = await getIncomingRequests();

    res.status(200).json(response);
})

// search a profile
router.post('/search', async (req, res) => {
    const response = {}
    const friends = ['a', 'b', 'c'];

    if (friends.includes(req.body.handle)) {
        response.message = "Profile Found"
        response.profile = req.body.handle
    } else {
        response.message = "Profile Not Found"
    }

    res.status(200).json(req.body);
})

// send friend request
router.post('/sendrequest', async (req, res) => {
    const response = {}
    const friends = ['a', 'b', 'c'];

    if (friends.includes(req.body.handle)) {
        response.message = "Request Sent!"
        response.profile = req.body.handle
    } else {
        response.message = "Profile Not Found"
    }

    res.status(200).json(req.body);
})

module.exports = router