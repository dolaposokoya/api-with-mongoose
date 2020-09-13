let express = require("express"),
    bcrypt = require("bcryptjs"),
    verifyToken = require("../model/auth");
let router = express.Router();
let adminSchema = require("../model/admin");
let metaDataSchema = require("../model/metadata"),
    jwt = require("jsonwebtoken");
config = require("../DB");
var base64 = require("base-64");

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", (req, res) => {
    let id = Math.floor(Math.random() * 1000 * 1000),
        profile_id = base64.encode(id);
    password = req.body.password;
    req.body.password = bcrypt.hashSync(password, 10);
    const admin = new adminSchema({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        profile_image: req.body.profile_image,
        password: req.body.password,
        email: req.body.email,
        profile_id: profile_id,
    });
    admin.save(function (err, data) {
        if (err) {
            res.status(200).json({ message: err, success: false });
        } else if (!err) {
            res.status(200).json({
                message: "Registration Successful",
                data: data,
                success: true,
            });
        }
    });
});

// - - - - - - - - - - - -  - - - - - - - - - - - - - - GET METADATA  - - - - - - - - - - - - - - - - - - - - - - - - //
router.get("/blood-all-group", (req, res) => {
    metaDataSchema.find().then((data) => {
        console.log("data", data);
        if (data) {
            res.json({ data: data });
        } else {
            res.json({ data: "Unable to retrieve data" });
        }
    });
});


module.exports = router;