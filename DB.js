const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient
const { ENVIRONMENT, MONGODB_LIVE_URL, MONGODB_LOCAL_URL } = process.env
let URL;
const dbName = 'bloodbank'
let db
ENVIRONMENT === 'development' ? URL = MONGODB_LOCAL_URL : URL = MONGODB_LIVE_URL

// MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   if (err) return console.log(err)
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${URL}`)
//   console.log(`Database: ${dbName}`)
// })

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
    if (error.code === "ECONNREFUSED") {
      console.log("Connection refused");
    }
  });