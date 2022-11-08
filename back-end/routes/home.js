const express = require('express')
const router = express.Router()
const home = express() // instantiate an Express object
const path = require("path")

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

// use the morgan middleware to log all incoming http requests
router.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
router.use(express.json()) // decode JSON-formatted incoming POST data
router.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
router.use("/static", express.static("public"))
// define the home page route


// using async/await in this route to show another way of dealing with asynchronous requests to an external API or database
router.get("/portfolioData", (req, res, next) => {
    axios
        .get("https://my.api.mockaroo.com/stock_data.json?key=8052c770")
        .then(apiResponse => apiResponse.data) // pass data along directly to client
        .then(data=>res.json(data))
        .catch(err => next(err)) // pass any errors to express
    
})
router.get('/', (req, res) => {
    res.send('Profile page')
})


let storeData=[];
// receive POST data from the client
router.post("/", async(req, res) => {
  // now do something amazing with the data we received from the client
  
  const data = {
      Ticker: req.body.Ticker,
      Position: req.body.Position,
      Quantity: req.body.Quantity,
      Price: req.body.Price,
  }
  storeData.push(data);
  // ... then send a response of some kind to client
  res.json(storeData);
})

module.exports = router
//module.exports = home