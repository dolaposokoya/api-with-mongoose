const mongoose = require("mongoose");
const URL = process.env.MONGODB_LIVE_URL || process.env.MONGODB_LOCAL_URL

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

const userSchema = require("./model/user.model");
