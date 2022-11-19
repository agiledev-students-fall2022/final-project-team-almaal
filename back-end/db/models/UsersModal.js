const { default: InternalPreviewGroup } = require('antd/lib/image/PreviewGroup')
const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
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
    },
    portfolio:{
        type: {
            stock_code:{
                type: String,
                required: true
            },
            amount:{
                type: Number,
                required: true
            }
        }
    },
    investment_visibility: {
        type: Boolean,
        required: true
    },
    profile_visibility:{
        type:  Boolean,
        required: true
    },
    feeds:{
        type:Array,
        required:true
    }

})

const UsersModel = mongoose.model("Users", UsersSchema)

module.exports = UsersModel