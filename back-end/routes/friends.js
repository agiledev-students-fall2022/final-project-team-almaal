const express = require('express')
const axios = require('axios');
const UsersModel = require('../db/models/UsersModal');
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
    try {
        const doc = await UsersModel.findById(req.body.id)
        res.status(200).json({ success: true, id: req.body.id, friends: doc.friends })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
    }
})

router.get('/viewprofile', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id)
        res.status(200).json({ success: true, id: req.body.id, profile: doc })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
    }
})

router.post('/deletefriend', async (req, res) => {
    try {
        const user = await UsersModel.findById(req.body.id)
        user.friends.pop(req.body.friendId)
        const savedResult = await user.save()

        res.status(200).json({ success: true, message: "Friend removed from connection", result: savedResult })
    } catch (error) {
        res.status(500).send({ success: false, error })
    }
})

// search a profile
router.post('/search', async (req, res) => {
    const response = {}
    const friends = ['a', 'b', 'c'];

    if (friends.includes(req.body.handle)) {
        response.message = "Profile Found"
        response.found = true
        response.profile = {
            name: {
                first: req.body.handle,
                last: "rand"
            },
            picture: {
                medium: "https://randomuser.me/api/portraits/med/men/46.jpg"
            }
        }
    } else {
        response.found = false
        response.message = "Profile Not Found"
    }

    res.status(200).json(response);
})

// send friend request
router.post('/sendrequest', async (req, res) => {
    const response = {}
    const friends = ['a', 'b', 'c'];

    if (friends.includes(req.body.handle.name.first)) {
        response.message = "Request Sent!"
        response.profile = req.body.handle
    } else {
        response.message = "Profile Not Found"
    }

    res.status(200).json(response);
})

router.get('/populate', async (req, res) => {
    try {
        const apiResponse = await axios.get("https://randomuser.me/api?results=5");
        const entries = []

        for (let i = 0; i < apiResponse.data.results.length; i++) {
            let entry = apiResponse.data.results[i]

            let result = {
                gender: entry.gender,
                name: entry.name,
                email: entry.email,
                login: entry.login,
                dob: entry.dob,
                registered: entry.registered,
                picture: entry.picture,
                friends: [],
                incomingRequests: []
            }

            // const doc = await UsersModel.create(result)
            entries.push(result)
        }

        // console.log(entries)
        const insertResponse = await UsersModel.insertMany(entries)
        console.log(insertResponse)

        res.status(200).send("ok")
    } catch (e) {
        res.status(500).json({ error: e })
        console.log(e)
    }
})


module.exports = router