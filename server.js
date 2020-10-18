<<<<<<< HEAD
require('dotenv').config()
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./DB");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const requestRoute = require("./routes/request.route");
const reservationRoute = require("./routes/reservation.route");
const bloodgroupRoute = require("./routes/bloodgroup.route");
const fileRoute = require("./routes/file.route");
const app = express();


app.use(cookieParser());


const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cors())
// app.use(morgan("combined"));
app.use("/api/admin", adminRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/bloodgroup", bloodgroupRoute);
app.use("/api/file", fileRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("Api is working!");
});

app.listen(PORT, () => {
    console.log(`App listen at http://localhost:${PORT}/`)
})
=======
require('dotenv').config()
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./DB");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const requestRoute = require("./routes/request.route");
const reservationRoute = require("./routes/reservation.route");
const bloodgroupRoute = require("./routes/bloodgroup.route");
const fileRoute = require("./routes/file.route");
const app = express();


app.use(cookieParser());


const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
// app.use(express.json({ limit: '100mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cors());
// app.use(morgan("combined"));
app.use("/api/admin", adminRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/bloodgroup", bloodgroupRoute);
app.use("/api/file", fileRoute);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("Api is working!");
});

app.listen(PORT, () => {
    console.log(`App listen at http://localhost:${PORT}/`)
})
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
