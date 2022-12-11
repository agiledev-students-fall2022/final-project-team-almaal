const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../db/models/UsersModal')
const auth = require('../middleware/auth')


// define the profile page route

router.get('/', auth, async (req, res) => {
    console.log("got here"+req.body.id)
    try {
        const user = await User.findById(req.user.id);
        console.log(user)
        return res.status(200).json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    //return res.status(200).json(user)
    // return res.status(200)
    // User.findById(req.body.id, (err,found) => {
    //     if(err){
    //         throw err
    //     }else{
    //         return res.status(200).json(found) 
    //     }
    // })
})

// logout route
router.get('/logout', auth, async (req, res) => {
    res.status(200).redirect('/login')
})

// update profile information
router.post('/update', auth, async (req, res) => {
    console.log(req)
    const response = {}
    if (req.user.username) {
        try {
            await User.findByIdAndUpdate(req.user.id, { "User.login.username": req.user.username })
            // await User.updateOne(
            //     {
            //         "_id": req.user.id
            //         // ,"login.uuid":req.body.uuid
            //     },
            //     {
            //         $set:{
            //             // "User.$[id].login.$[uuid].username": req.body.username
            //             "User.login.username": req.body.username
            //         }
            //     }
            //     // ,
            //     // {
            //     //     arrayFilters: [
            //     //         {"id": req.user.id},
            //     //         {"uuid": req.body.uuid}
            //     //     ]
            //     // }
            // )
            response.username = req.user.username
            console.log("Successfully updated username to " + req.user.username)
        } catch (err) {
            console.log("Error occured, " + err)
        }
    }
    if (req.user.password) {
        try {
            await User.findByIdAndUpdate(req.user.id, { "User.login.password": req.user.password })
            response.password = req.user.password
            console.log("Successfully updated password to " + req.user.password)
        } catch (err) {
            console.log("Error occured, " + err)
        }
    }

    if (req.user.investment_visibility) {
        try {
            await User.findByIdAndUpdate(req.user.id, { investment_visibility: req.user.investment_visibility })
            response.investment_visibility = req.user.investment_visibility
            console.log("investment visibility switched to " + req.user.investment_visibility)
        } catch (err) {
            console.log("Error occured, " + err)
        }
    }

    if (req.user.profile_visibility) {
        try {
            await User.findByIdAndUpdate(req.user.id, { profile_visibility: req.user.profile_visibility })
            response.profile_visibility = req.user.profile_visibility
            console.log("profile visibility switched to " + req.user.profile_visibility)
        } catch (err) {
            console.log("Error occured, " + err)
        }
    }

    return res.status(200).json(response)

})

module.exports = router