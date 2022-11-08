const express = require('express')
const app = express()
const port = 3000
const home = require('./routes/home')
const friends = require('./routes/friends')
const groups = require('./routes/groups')
const news = require('./routes/news')
const profile = require('./routes/profile')
const axios = require("axios")



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/home', home);
app.use('/groups', groups);
app.use('/news', news);
app.use('/friends', friends);
app.use('/profile', profile);

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!