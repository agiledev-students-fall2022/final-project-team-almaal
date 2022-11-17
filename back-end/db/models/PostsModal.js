const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    user_id: ObjectId,
    l_name: String
})

const UsersModel = mongoose.model("Users", PostsSchema)

module.exports = UsersModel