const express = require('express')
const axios = require('axios');   
const UsersModel = require('../db/models/UsersModal');
const router = express.Router()
const auth = require('../middleware/auth')

const getIncomingRequests = async () => {
    const response = await axios.get("https://randomuser.me/api?results=5");

    return response.data.results;
}

// view requests
router.get('/', auth, async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })

        const requests = []
        for (let i = 0; i < doc.friendRequests.length; i++) {
            let entry = await UsersModel.findById(doc.friendRequests[i]).orFail(() => {
                throw "Requester Profile not found"
            })

            requests.push(entry)
        }

        return res.status(200).send({ success: true, friendRequests: requests })
    } catch (error) {
        return res.status(500).send({ success: false, error })
    }

    // res.status(200).json({friendRequests: getIncomingRequests()})
})

// modify incoming requests
router.post('/modifyrequest', auth, async (req, res) => {
    let message = ""
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "Friend Request not found"
        })
        const friendRequest = doc.friendRequests.findIndex(sender => sender === req.body.sender)

        if (friendRequest !== -1) {
            const friendId = doc.friendRequests[friendRequest]
            const returnValue = doc.friendRequests.splice(friendRequest, 1)

            if (req.body.action === "accept") {
                doc.friends.push(friendId)
                message = "Friend was successfully added"

                const friendDoc = await UsersModel.findById(req.body.sender).orFail(() => {
                    throw "Friend ID not found"
                })
                friendDoc.friends.push(req.body.id)
                await friendDoc.save()

            } else if (req.body.action === "delete") {
                message = "Friend request removed"
            }

            await doc.save()

            // add return value of splice
            return res.status(200).json({ success: true, friendId, message })
        } else {
            throw "Friend Request Not Found"
        }
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})

// view all friends
router.get('/friendlist', auth, async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.id).orFail(() => {
            throw "ID not found"
        })

        const friends = []
        for (let i = 0; i < doc.friends.length; i++) {
            let entry = await UsersModel.findById(doc.friends[i]).orFail(() => {
                throw "Requester Profile not found"
            })

            friends.push(entry)
        }

        return res.status(200).json({ success: true, id: req.body.id, friends })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error })
    }
})

router.get('/viewprofile', auth, async (req, res) => {
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

router.post('/deletefriend', auth, async (req, res) => {
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
router.post('/search', auth, async (req, res) => {
    try {
        const doc = await UsersModel.findOne({ "login.username": req.body.searchId }).orFail(() => {
            throw "Profile Not Found"
        })
        res.status(200).send({ success: true, profile: doc, message: "Profile Found" })

    } catch (error) {
        res.status(500).send({ success: false, error, message: "Profile Not Found" })
    }
})

// send friend request
router.post('/sendrequest', auth, async (req, res) => {
    try {
        const doc = await UsersModel.findById(req.body.searchId).orFail(() => {
            throw "ID not found"
        })

        if (!doc.friendRequests.includes(req.body.id)) {
            if (!doc.friends.includes(req.body.id)) {
                doc.friendRequests.push(req.body.id)
                await doc.save()
                res.status(200).send({ success: true, message: "Friend Request sent", friend: req.body.searchId })
            } else {
                throw "User already in friendlist"
            }
        } else {
            throw "Request already sent"
        }

    } catch (error) {
        res.status(500).send({ success: false, message: error })
    }
})

router.get('/populate', auth, async (req, res) => {
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