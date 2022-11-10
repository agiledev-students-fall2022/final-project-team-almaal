const express = require('express')
const multer = require('multer')
const router = express.Router()
// define the home page route

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./feed_posts");
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.status(200).json(data);
})

router.post("/feedpost", upload.single('test'), (req, res) => {
    console.log(req.file);
    setTimeout(()=>{
        data.feed.push({
            profilePic:'https://randomuser.me/api/',
            message: req.body.message,
            timestamp:'2 sec ago',
            username:'User0',
            image: req.file == undefined ? null : req.file,
            likes: '0',
            comments:[]
        })

        console.log(req.body);
        console.log('Upload Complete');

        console.log('/n', data);
        return res.status(200).json({result:true, message:'post saved successfully'});
    }, 3000);

})

router.post("/postcomment", (req, res) => {
    setTimeout(()=>{
        const temp = JSON.parse(req.body);
        console.log(temp);
        data.feed.map((key, i) => {
            if(key.username == temp.userPost){
                key.comments.push({username: temp.user, comment: temp.user_comment, profilePic: ''});
            }
        })
        console.log('COmment', data);
        return res.status(200).json({result:true, message:'comment saved successfully'});
    }, 1000);
})

router.post("/postlike", (req, res)=>{
    console.log(req.body);
    const temp = JSON.parse(req.body);
    data.feed.map((key, i)=>{
        if(key.username == temp.userPost){
            if(temp.like){
                key.likes = (parseInt(key.likes) + 1).toString();
            }else{
                key.likes = (parseInt(key.likes) - 1).toString();
            }
        }
    })
    return res.status(200).json({result:true, message:'like received'});
})

module.exports = router