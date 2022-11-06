const express = require('express')
const app = express()
const port = 3001
const home = require('./routes/home')
const friends = require('./routes/friends')
const groups = require('./routes/groups')
const news = require('./routes/news')
const profile = require('./routes/profile')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/home', home);
app.use('/groups', groups);
app.use('/news', news);
app.use('/friends', friends);
app.use('/profile', profile);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})