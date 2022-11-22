const mongoose = require('mongoose')


const PostsSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    profilePic: Object,
    username: String,
    timestamp: Date,
    post_text: String,
    post_img: {
        data: Buffer,
        contentType: String
    },
    likes: Array,
    comments: Array
})

const PostsModal = mongoose.model("Posts", PostsSchema)

module.exports = PostsModal