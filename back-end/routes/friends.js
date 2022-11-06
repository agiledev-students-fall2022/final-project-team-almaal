const express = require('express')
const axios = require('axios')
const router = express.Router()
// define the home page rout

const getIncomingRequests = async () => {
    const response = await axios.get("https://dummyapi.io/data/v1/user?limit=5", {
        headers: {
            "Content-Type": "application/json",
            "app-id": "6357430507c41c1c4cf1a09b"
        }
    });

    return response.data;
    // console.log("here")
}

router.get('/', async (req, res) => {
    const response = {}

    // response.friendRequests = await getIncomingRequests();

    res.status(200).json(response);
})

router.post('/search', async (req, res) => {
    const response = {}
    const friends = ['a', 'b', 'cs']

    if (friends.includes(req.body.handle)) {
        // send friend request

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