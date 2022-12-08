const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../db/models/UsersModal')
const auth = require('../middleware/auth')

var user = {
    username: "@frankwu2002",
    password: "fakepassword",
    investment_visibility: false,
    profile_visibility: false,
    total_friends: 10,
    total_groups: 7,
    total_invested: "$5000",
    total_profit: "+10.5%"
};

// define the profile page route
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    return res
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
    if(req.body.username) {
        try{
            await User.findByIdAndUpdate(req.body.id, {"User.login.username" : req.body.username})
            // await User.updateOne(
            //     {
            //         "_id": req.body.id
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
            //     //         {"id": req.body.id},
            //     //         {"uuid": req.body.uuid}
            //     //     ]
            //     // }
            // )
            response.username = req.body.username 
            console.log("Successfully updated username to "+req.body.username)
        }catch(err){
            console.log("Error occured, "+err)
        }
    }
    if(req.body.password){
        try{
            await User.findByIdAndUpdate(req.body.id, {"User.login.password" : req.body.password})
            response.password = req.body.password
            console.log("Successfully updated password to "+req.body.password) 
        }catch(err){
            console.log("Error occured, "+err)
        }
    }

    if(req.body.investment_visibility){
        try{
            await User.findByIdAndUpdate(req.body.id,{investment_visibility : req.body.investment_visibility})
            response.investment_visibility = req.body.investment_visibility
            console.log("investment visibility switched to "+req.body.investment_visibility)
        }catch(err){
            console.log("Error occured, " + err)
        }
    }

    if(req.body.profile_visibility){
        try{
            await User.findByIdAndUpdate(req.body.id,{profile_visibility : req.body.profile_visibility})
            response.profile_visibility = req.body.profile_visibility
            console.log("profile visibility switched to "+req.body.profile_visibility)
        }catch(err){
            console.log("Error occured, " + err)
        }
    }
    
    return res.status(200).json(response)
    
})

module.exports = router