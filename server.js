require('dotenv').config()
const { SESSION_SECRET } = process.env
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./DB");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const requestRoute = require("./routes/request.route");
const reservationRoute = require("./routes/reservation.route");
const bloodgroupRoute = require("./routes/bloodgroup.route");
const fileRoute = require("./routes/file.route");


const app = express();


const PORT = process.env.PORT || 5100
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cors());
app.use(session({
    secret: SESSION_SECRET,
    token: '',
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     secure: true,
    //     httpOnly: true
    // }
}));
// app.use(morgan("combined"));


app.use("/api/admin", adminRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/bloodgroup", bloodgroupRoute);
app.use("/api/file", fileRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// app.get("/", (req, res) => {
// const newSession = req.session;
// newSession.token;
// });

app.listen(PORT, () => {
    console.log(`App listen at http://localhost:${PORT}/`)
})