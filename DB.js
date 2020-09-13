const mongoose = require("mongoose");
// const uri =
//   "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const uri =
  "mongodb+srv://dolaposokoya97:adedolapo97@cluster0-xmua4.mongodb.net/bloodbank";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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

const userSchema = require("./model/user");
