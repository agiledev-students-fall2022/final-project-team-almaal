const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../db/models/UsersModal')

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
router.get('/', async (req, res) => {
    User.findById(req.body.id, (err, found) => {
        if (!err) {
            return res.status(200).json(found);
        }
        // console.log(err);
        // res.send("Please login first.")
        // res.status(401).redirect('/login')
    }).catch(err => console.log("Error occured, " + err));
    // const response = user
    // res.status(200).json(response)
})

// logout route
router.get('/logout', async (req, res) => {
    res.status(200).redirect('/login')
})

// update profile information
router.post('/update', async (req, res) => {
    console.log(req)
    const response = {}
    // if(req.body.username) {
    //     await User.findByIdAndUpdate(req.body.id, {login.username = req.body.username}, (err,found)=>{
    //         if(err){
    //             console.log("Error occured, " + err)
    //             return res.status(401)
    //         }else{
    //             console.log("Successfully updated username to "+req.body.username)
    //             response.username = req.body.username
    //         }
    //     })
    // }
    // if(req.body.password){
    //     await User.findByIdAndUpdate(req.body.id, {login.password = req.body.password}, (err,found)=>{
    //         if(err){
    //             console.log("Error occured, " + err)
    //             return res.status(401)
    //         }else{
    //             console.log("Successfully updated password to "+req.body.password)
    //             response.password = req.body.password
    //         }
    //     })
    // }

    if(req.body.investment_visibility){
        await User.findByIdAndUpdate(req.body.id, {investment_visibility : req.body.investment_visibility}
            // , (err,found)=>{
            // if(err){
            //     console.log("Error occured, " + err)
            //     return res.status(401)
            // }else{
            //     console.log("Successfully updated investment_visibility to "+req.body.investment_visibility)
            //     response.investment_visibility = req.body.investment_visibility
            // }
        // }
        ).catch(err => console.log("Error occured, " + err));
    }

    if(req.body.profile_visibility){
        await User.findByIdAndUpdate(req.body.id, {profile_visibility : req.body.profile_visibility}
        //     , (err,found)=>{
        //     if(err){
        //         console.log("Error occured, " + err)
        //         return res.status(401)
        //     }else{
        //         console.log("Successfully updated profile_visibility to "+req.body.profile_visibility)
        //         response.profile_visibility = req.body.profile_visibility
        //     }
        // }
        ).catch(err => console.log("Error occured, " + err));
    }

    return res.status(200).json(response)
    
    // await User.findByIdAndUpdate(req.body.id, (err, found) => {
    //     if (!err) {
    //         const response = {}
            
    //         if (req.body.username) {
    //             found.login.username = req.body.username
    //             response.username = req.body.username
    //         }
    //         if (req.body.password) {
    //             found.login.password = req.body.password
    //             response.password = req.body.password
    //         }
    //         if (req.body.investment_visibility) {
    //             found.investment_visibility = req.body.investment_visibility
    //             response.investment_visibility = req.body.investment_visibility
    //         }
    //         if (req.body.profile_visibility) {
    //             found.profile_visibility = req.body.profile_visibility
    //             response.profile_visibility = req.body.profile_visibility
    //         }

    //         found.save();
    //         res.status(200).json(response)

    //         return res.status(401).redirect('/login')
    //     }

    // }).catch(err => console.log("Error occured, " + err));

    
})

module.exports = router