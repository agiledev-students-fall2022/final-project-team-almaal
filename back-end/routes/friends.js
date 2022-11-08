const express = require('express')
const axios = require('axios')
const router = express.Router()
// define the home page rout

const getIncomingRequests = async () => {
    const response = await axios.get("https://randomuser.me/api?results=5");

    return response.data.results;
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
    console.log(req.body)

    if (req.body.action === "accept") {
        response.message = "Friend Successfully Added!"
    } else if (req.body.action === "delete") {
        response.message = "Request Removed"
    }

    res.status(200).json(response);
})

// view all friends
router.get('/friendlist', async (req, res) => {
    const response = {}

    response.friends = await getIncomingRequests();

    res.status(200).json(response);
})

router.get('/viewprofile', async (req, res) => {
    const response = {}
    response.id = req.body.id;

    const profile = await axios.get("https://randomuser.me/api?results=1");
    response.profile = profile.results

    res.status(200).json(response);
})

router.get('/deletefriend', async (req, res) => {
    const response = {}
    response.id = req.body.id;
    response.message = "Friend Removed from Connection"

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