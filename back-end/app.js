const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');

const home = require('./routes/home');
const friends = require('./routes/friends');
const groups = require('./routes/groups');
const news = require('./routes/news');
const profile = require('./routes/profile');
const axios = require('axios');
const login = require('./routes/login');
const session = require('express-session');

const Posts = require('./db/models/PostsModal');

require('dotenv').config();

mongoose.connect(`${process.env.DB_URL}`).then(
    (connection) => console.log('Connected to MongoDB'),
    (err) => console.log(err)
);

const db = mongoose.connection;

// user database
const connectDB = require('./config/db');
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.text());
app.use(express.json());

//allow cross-origin resource sharing
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    );
    next();
});

app.use((req, res, next) => {
    req.body.id = "637820a5a5376540710ee44f"
    req.body.uuid = "36eb50b8-e941-47fd-ba44-7ce302a1aa6d"
    // console.log("here", req.body.id)
    next();
});

app.use('/home', home);
app.use('/groups', groups);
app.use('/news', news);
app.use('/friends', friends);
app.use('/profile', profile);
app.use('/login', login);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
    console.log('hello world');
    res.send('Hello World!!!');
});

module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// module.exports = app.listen(port);
