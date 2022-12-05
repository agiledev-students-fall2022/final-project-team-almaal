const express = require('express')
const multer = require('multer')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
// define the home page route
const auth = require('../middleware/auth')
const Posts = require('../db/models/PostsModal')

let data = {feed : [{
    profilePic:'https://randomuser.me/api/',
    message: 'Hello World!',
    timestamp:'59 secs ago',
    username:'User1',
    image:'https://picsum.photos/500/300',
    likes: '20',
    comments:[{username: 'Alice', comment:'Wow!', profilePic: ''},{username: 'Bob', comment:'Interesting :)', profilePic: ''}]
}, 
{
    profilePic:'https://randomuser.me/api/',
    message: 'Lovely!',
    timestamp:'2 mins ago',
    username:'User2',
    image:'https://random.imagecdn.app/500/300',
    likes: '69',
    comments:[]
},
{
    profilePic:'https://randomuser.me/api/',
    message: 'Lorem Ipsum',
    timestamp:'2 days sgo',
    username:'User3',
    image:'https://picsum.photos/500/350',
    likes: '155',
    comments:[]
}
]};



const session = {
    user_id : '637820a5a5376540710ee451',
    username: 'Fathi Kruijs',
    user_pp: 'https://randomuser.me/api/portraits/thumb/men/16.jpg'
}


//const temp_data = new Posts({user_id: ('637820a5a5376540710ee44f'), profilePic:'https://randomuser.me/api/portraits/thumb/men/27.jpg', username: 'Cladius Grief', timestamp: new Date(), post_text: "This is my first post!", post_img: null, likes: [1,2,3], comments: {user_id: '637820a5a5376540710ee453', user: "Melissa Myers", comment: "Welcome!", profilePic: 'https://randomuser.me/api/portraits/thumb/women/38.jpg', timestamp: new Date()}})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./feed_posts");
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.get('/', auth, (req, res) => {
    Posts.find({}).sort({timestamp: -1}).exec((err, obj)=>{
        if(!err){
            res.status(200).json({session_user: session, feed: obj});
        }
    })
    // temp_data.save((err)=>{
    //     if(!err){
    //         console.log("muni");
    //         res.status(200).json({feed: [temp_data]});
    //     }
    // })
    //res.status(200).json({feed: [temp_data]});
})

router.post("/feedpost", auth, upload.single('post_img'), (req, res) => {
    console.log(req.query, req.body);
    setTimeout(()=>{
        const temp_data = new Posts(
            {user_id: session.user_id, 
            profilePic: session.user_pp, 
            username: session.username, 
            timestamp: new Date(), 
            post_text: req.body.post_text, 
            post_img: req.file == undefined ? null :({
                data: fs.readFileSync(path.join(path.dirname('groups.js').split(path.sep).pop() + '/feed_posts/' + req.file.originalname)),
                contentType: 'image/png'
            }), 
            likes: [], 
            comments: []}
        );

        temp_data.save((err)=>{
            if(!err){
                res.status(200).json({result:true, message:'post saved successfully'});
            }
            else{
                res.status(400);
            }
        })
        // data.feed.push({
        //     profilePic:'https://randomuser.me/api/',
        //     message: req.body.message,
        //     timestamp:'2 sec ago',
        //     username:'User0',
        //     image: req.file == undefined ? null : req.file,
        //     likes: '0',
        //     comments:[]
        // })

        // console.log(req.body);
        // console.log('Upload Complete');

        // console.log('/n', data);
        //return res.status(200).json({result:true, message:'post saved successfully'});
    }, 0000);

})

router.post("/postcomment", auth, (req, res) => {
    setTimeout(()=>{
        const temp = JSON.parse(req.body);
        const comment_data = {uid: session.user_id, username: session.username, comment: temp.user_comment, profilePic: session.user_pp}
        
        Posts.updateOne({_id: temp.post_id}, {$push: {comments: comment_data}}).then(
            res.status(200).json({result:true, message:'comment saved successfully'})
        )

        // Posts.find({_id: temp.post_id}, (err, obj)=>{
        //     if(!err){
        //         obj.comments.$push(comment_data);
        //     }
        //     return res.status(200).json({result:true, message:'comment saved successfully'});
        // })
        
        // data.feed.map((key, i) => {
        //     if(key.username == temp.userPost){
        //         key.comments.push({username: temp.user, comment: temp.user_comment, profilePic: ''});
        //     }
        // })
    }, 0000);
})

router.post("/postlike", auth, (req, res)=>{
    const temp = JSON.parse(req.body);

    if(temp.like){
        Posts.updateOne({_id: temp.post_id}, {$push: {likes: session.user_id}}).then(
            res.status(200).json({result:true, message:'like received'})
        )
    }
    else{
        Posts.updateOne({_id: temp.post_id}, {$pull: {likes: session.user_id}}).then(
            res.status(200).json({result:true, message:'like unreceived'})
        )
    }
    
    // data.feed.map((key, i)=>{
    //     if(key.username == temp.userPost){
    //         if(temp.like){
    //             key.likes = (parseInt(key.likes) + 1).toString();
    //         }else{
    //             key.likes = (parseInt(key.likes) - 1).toString();
    //         }
    //     }
    // })
    // return res.status(200).json({result:true, message:'like received'});
})

router.post('/deletepost', auth, (req, res)=>{
    const temp = JSON.parse(req.body);

    Posts.deleteOne({_id: temp.post_id}).then(
        res.status(200).json({'message': 'Succesfully Deleted'})
    )
})
module.exports = router