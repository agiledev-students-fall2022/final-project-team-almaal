const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        required: true
    }
})

const UsersModel = mongoose.model("Users", UsersSchema)

module.exports = UsersModel