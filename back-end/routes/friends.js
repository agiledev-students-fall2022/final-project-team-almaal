const express = require('express')
const axios = require('axios')
const router = express.Router()
// define the home page rout

const getIncomingRequests = async () => {
    const response = await axios.get("https://randomuser.me/api?results=5");

    return response.data;
}

router.get('/', async (req, res) => {
    const response = {}

    response.friendRequests = await getIncomingRequests();

    res.status(200).json(response);
})

router.get('/friendlist', async (req, res) => {
    const response = {}

    response.friendRequests = await getIncomingRequests();

    res.status(200).json(response);
})

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

router.post('/modifyrequest', async (req, res) => {
    const response = {}

    if (req.body.action === "add") {
        response.message = "Friend Successfully Added!"
    } else if (req.body.action === "remove") {
        response.message = "Request Removed"
    }

    res.status(200).json(response);
})

module.exports = router