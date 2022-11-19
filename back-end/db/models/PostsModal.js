const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    l_name: String
})

const UsersModel = mongoose.model("Users", PostsSchema)

module.exports = UsersModel