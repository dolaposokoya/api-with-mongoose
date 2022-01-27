const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient
const { ENVIRONMENT, MONGODB_LIVE_URL, MONGODB_LOCAL_URL } = process.env
let URL;

ENVIRONMENT === 'development' ? URL = MONGODB_LOCAL_URL : URL = MONGODB_LIVE_URL;
// console.log('Connected')
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then((response, error) => {
    if (response) {
      console.log("Database Connected");
    } else {
      console.log("Error occured", error);
    }
  })
  .catch((error) => {
    console.log('response', error.message)
  });