const express = require('express')
const router = express.Router()
// define the home page route

router.get('/', (req, res) => {
    const data = {feed : [{
        profilePic:'https://randomuser.me/api/',
        message: 'Hello World!',
        timestamp:'69 secs ago',
        username:'Ram Bahadur',
        image:'https://picsum.photos/200/300',
        likes: '20',
        comments:[{username: 'Alice', comment:'Wow!', profilePic: ''},{username: 'Bob', comment:'Following... jknkjn jknjkjnjk jknjknkj jknkjnjk jknjknjk jknjkn jk knjk jknjknjk jknjknjk jknjknjk jknjk ', profilePic: ''}]
    }, 
    {
        profilePic:'https://randomuser.me/api/',
        message: 'Here are Cryptos for 2022...',
        timestamp:'2 mins ago',
        username:'Mark Muji',
        image:'https://picsum.photos/200/300',
        likes: '69',
        comments:[]
    },
    {
        profilePic:'https://randomuser.me/api/',
        message: 'Twitter is Here',
        timestamp:'2 days sgo',
        username:'Elan Mosk',
        image:'https://picsum.photos/200/300',
        likes: '155',
        comments:[]
    }
    ]};

    res.status(200).json(data);
})

module.exports = router