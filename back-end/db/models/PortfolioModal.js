const mongoose = require('mongoose')
const Schema=mongoose.Schema

const PortfolioSchema = new Schema({
    //key:Schema.Types.ObjectId,
    key:Number,
    ticker: {
        type:String,
        required: true,
    },
    position: {
        type:String,
        required: true,
    },
    quantity: {
        type:Number,
        required: true,
       //default: '+0',
    },
    price: {
        type:Number,
        required: true,
        //default: '$0',
    }
},{timestamps:true}
)

const Portfolio = mongoose.model("Portfolio", PortfolioSchema)

module.exports = Portfolio