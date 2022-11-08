const express = require('express')
const app = express()
const port = 3001
const home = require('./routes/home')
const friends = require('./routes/friends')
const groups = require('./routes/groups')
const news = require('./routes/news')
const profile = require('./routes/profile')
const axios = require("axios")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// using async/await in this route to show another way of dealing with asynchronous requests to an external API or database
app.get('/home/portfolio', (req, res, next) => {
    axios
        .get("https://my.api.mockaroo.com/stock_data.json?key=8052c770")
        .then(apiResponse => res.send(apiResponse.data)) // pass data along directly to client
        .catch(err => next(err)) // pass any errors to express
    
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!