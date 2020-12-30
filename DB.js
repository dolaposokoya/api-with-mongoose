const mongoose = require("mongoose");
const { ENVIRONMENT, MONGODB_LIVE_URL, MONGODB_LOCAL_URL } = process.env
let URL;
ENVIRONMENT === 'development' ? URL = MONGODB_LOCAL_URL : URL = MONGODB_LIVE_URL
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