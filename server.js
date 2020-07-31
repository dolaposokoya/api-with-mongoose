const multer = require("multer");
const fs = require("fs");
const morgan = require("morgan");
const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    config = require("./DB");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const DIR = "./images";
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const requestRoute = require("./routes/request.route");
const reservationRoute = require("./routes/reservation.route");
const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
// app.use(express.json({ limit: '100mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cors());
app.use(morgan("combined"));
app.use("/admin", adminRoute); //user table
app.use("/request", requestRoute);
app.use("/user", userRoute);
app.use("/reservation", reservationRoute);
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json({ limit: '50mb' }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on port " + port);
});