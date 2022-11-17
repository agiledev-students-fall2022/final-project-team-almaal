const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')

const home = require('./routes/home')
const friends = require('./routes/friends')
const groups = require('./routes/groups')
const news = require('./routes/news')
const profile = require('./routes/profile')
const axios = require("axios")
const login = require('./routes/login')

require('dotenv').config()

// mongoose.connect(`${process.env.DB_URL}`).then(connection => console.log('Connected to MongoDB'),
//     err => console.log(err));
// const db = mongoose.connection

app.use(express.urlencoded({ extended: false }));
app.use(express.text());
app.use(express.json());
//allow cross-origin resource sharing
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use('/home', home);
app.use('/groups', groups);
app.use('/news', news);
app.use('/friends', friends);
app.use('/profile', profile);
app.use('/login', login);

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`)
// })

module.exports = app.listen(port)
