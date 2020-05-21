const multer = require("multer");
const fs = require("fs");
const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  config = require("./DB");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const DIR = "./images";
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const requestRoute = require("./routes/request.route");
const reservationRoute = require("./routes/reservation.route");
require("dotenv").config();

//Not part of file upload

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/request", requestRoute); //user table
app.use("/user", userRoute);
app.use("/reservation", reservationRoute);

app.use(express.static(path.join(__dirname, "public")));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });
app.post("/api/uploads", upload.single("image"), function (req, res) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
    });
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const port = process.env.PORT || "https://bloodbank-api-v1.herokuapp.com/user/login-user";
const port = process.env.PORT || 5000;
if (port === undefined) {
  console.log("Port number is not defined");
} else {
  const server = app.listen(port, function () {
    console.log("Listening on port " + port);
  });
}
