const express = require('express')
const multer = require('multer')
const router = express.Router()
// define the home page route

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
    const data = {feed : [{
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

    res.status(200).json(data);
})

router.post("/feedpost", upload.single('test'), (req, res) => {
    console.log(req.file);
    setTimeout(()=>{
        console.log(req.body);
        console.log('Upload Complete');
        return res.status(200).json({result:true, message:'post saved successfully'});
    }, 3000);

})

router.post("/postcomment", (req, res) => {
    setTimeout(()=>{
        console.log(req.body);
        return res.status(200).json({result:true, message:'comment saved successfully'});
    }, 1000);
})

module.exports = router