const express = require('express')
const axios = require('axios');
const UsersModel = require('../db/models/UsersModal');
const router = express.Router()

// const getIncomingRequests = async () => {
//     const response = await axios.get("https://randomuser.me/api?results=5");

//     return response.data.results;
// }

// view requests
router.get('/', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })
        res.status(200).send({ success: true, friendRequests: doc.friendRequests })
    } catch (error) {
        res.status(500).send({ success: false, error })
    }
})

// modify incoming requests
router.post('/modifyrequest', async (req, res) => {
    let message = ""

    try {
        const doc = await UsersModel.findById(req.body.receiver).orFail(() => {
            throw "Friend Request not found"
        })
        const friendRequest = doc.friendRequests.findIndex(sender => sender === req.body.sender)

        if (friendRequest !== -1) {
            const friendId = doc.friendRequests[friendRequest]
            const returnValue = doc.friendRequests.splice(friendRequest, 1)

            if (req.body.action === "accept") {
                doc.friends.push(friendId)
                message = "Friend was successfully added"
            } else if (req.body.action === "delete") {
                message = "Friend request removed"
            }

            await doc.save()

            // add return value of splice
            res.status(200).json({ success: true, friendId, message })
        } else {
            throw "Friend Request Not Found"
        }
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
})

// view all friends
router.get('/friendlist', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })
        res.status(200).json({ success: true, id: req.body.id, friends: doc.friends })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
    }
})

router.get('/viewprofile', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })
        res.status(200).json({ success: true, id: req.body.id, profile: doc })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
    }
})

router.post('/deletefriend', async (req, res) => {
    try {
        const user = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })

        user.friends.splice(user.friends.indexOf(req.body.friendId), 1)
        const savedResult = await user.save()

        res.status(200).json({ success: true, message: "Friend removed from connection", result: savedResult })
    } catch (error) {
        res.status(500).send({ success: false, error })
    }
})

// search a profile
router.get('/search', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.searchId).orFail(() => {
            throw "ID not found"
        })
        res.status(200).send({ success: true, profile: doc })
    } catch (error) {
        res.status(500).send({ success: false, error })
    }
})

// send friend request
router.post('/sendrequest', async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.searchId).orFail(() => {
            throw "ID not found"
        })

        if (req.body.id !== undefined && !doc.friendRequests.includes(req.body.id)) {
            doc.friendRequests.push(req.body.id)
            await doc.save()
            res.status(200).send({ success: true, message: "Friend Request sent", friend: req.body.searchId })
        } else {
            throw "Request already sent Or Id not provided"
        }

    } catch (error) {
        res.status(500).send({ success: false, error })
    }
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