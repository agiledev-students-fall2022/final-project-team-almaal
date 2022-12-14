const express = require('express')
const multer = require('multer')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
// define the home page route
const auth = require('../middleware/auth')
const Posts = require('../db/models/PostsModal')
const Users = require('../db/models/UsersModal')


//const temp_data = new Posts({user_id: ('637820a5a5376540710ee44f'), profilePic:'https://randomuser.me/api/portraits/thumb/men/27.jpg', username: 'Cladius Grief', timestamp: new Date(), post_text: "This is my first post!", post_img: null, likes: [1,2,3], comments: {user_id: '637820a5a5376540710ee453', user: "Melissa Myers", comment: "Welcome!", profilePic: 'https://randomuser.me/api/portraits/thumb/women/38.jpg', timestamp: new Date()}})

function check_PP(arr){
    try{
        const temp= arr[0].picture.medium;
        return temp;
    }catch(e){
        return null;
    }
}

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
    const user_id = req.user.id;
    let friend_list = [];
    let feed_posts = [];
    let session;
    Users.find({_id:  mongoose.Types.ObjectId(user_id)}).exec(async (err, result)=>{
        if(!err && result.length>0){
            friend_list.push(...result[0].friends);
            
            await new Promise((resolve, reject) => {
                let expected_cnt = friend_list.length;
                let cnt = 0;
                
                friend_list.map(async (val) =>{
                    Posts.find({user_id:  mongoose.Types.ObjectId(val)}).sort({timestamp: -1}).exec((err, obj)=>{
                        if(!err){
                            feed_posts.push(...obj);
                            cnt++;
                            if (cnt === expected_cnt) {
                                resolve();
                            }
                        }                        
                    })

                    
                });
                resolve();
            })

            session = {
                user_id : user_id,
                username: result[0].name,
                user_pp : check_PP(result)
                //(typeof(result[0].picture.medium) == undefined ? null :  result[0].picture.medium)
            };
            Posts.find({'user_id': mongoose.Types.ObjectId(user_id)}).sort({timestamp: -1}).exec(async (err, result) =>{
                if(!err){
                    feed_posts.push(...result);
                    res.status(200).json({session_user: session, feed: feed_posts.sort((a, b) => {
                        return b.timestamp - a.timestamp;
                    })});
                }else{
                    res.status(200).json({'message':'No Posts Found'});
                }
            })
        }else{
            res.status(200).json({'message':'No Posts Found'});
        }
    })

})

router.post("/feedpost", auth, upload.single('post_img'), (req, res) => {
    setTimeout(()=>{
        const user_id = req.user.id;
        let req_pp;
        let req_username;

        Users.find({_id: user_id}).exec((err, result)=>{
            if(!err){
                req_pp = check_PP(result);
                req_username = result[0].name;

                const temp_data = new Posts(
                    {user_id: user_id, 
                    profilePic: req_pp, 
                    username: req_username, 
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
        const temp = req.body;

        const user_id = req.user.id;
        let req_pp;
        let req_username;

        Users.find({_id: user_id}).exec((err, result)=>{
            if(!err){
                req_pp = check_PP(result);//typeof(result[0].picture.medium) == undefined ? null :  result[0].picture.medium;
                req_username = result[0].name;

                const comment_data = {uid: user_id, username: req_username, comment: temp.user_comment, profilePic: req_pp}
                Posts.updateOne({_id: temp.post_id}, {$push: {comments: comment_data}}, (err, docs) => {
                    if(err){
                        res.status(400).json({result: false, message:'Something went wring!'});
                    }
                    res.status(200).json({result:true, message:'comment saved successfully'})
                })
            }
        })

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
    const temp = req.body;

    if(temp.like){
        Posts.updateOne({_id: temp.post_id}, {$push: {likes: req.user.id}}).then(
            res.status(200).json({result:true, message:'like received'})
        )
    }
    else{
        Posts.updateOne({_id: temp.post_id}, {$pull: {likes: req.user.id}}).then(
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
    const temp = (req.body);

    Posts.deleteOne({_id: temp.post_id}).then(
        res.status(200).json({'message': 'Succesfully Deleted'})
    )
})
module.exports = router