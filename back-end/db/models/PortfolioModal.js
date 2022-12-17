const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  user_id: String, //this is the id of the session user who's adding investment
  //key:Number,
  ticker: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    //default: '+0',
  },
  price: {
    type: Number,
    required: true,
    //default: '$0',
  },
  //time is stored in day/month/year format
  //timestamp: String,
  timestamp: Date,
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
