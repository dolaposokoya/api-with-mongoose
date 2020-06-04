let express = require("express"),
  bcrypt = require("bcryptjs"),
  verifyToken = require("../model/auth");
let router = express.Router();
let adminSchema = require("../model/admin");
let userSchema = require("../model/user");
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

// - - - - - - - - - - - -  - - - - - - - - - - - - -  - CREATE REQUEST - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/create-request", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  var request = new adminSchema({
    patient_name: req.body.patient_name,
    patient_mobile: req.body.patient_mobile,
    user_id: legit.user_id,
    blood_group: req.body.blood_group,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    hospital_name: req.body.hospital_name,
    hospital_address: req.body.hospital_address,
    doctor_name: req.body.doctor_name,
    hospital_mobile: req.body.hospital_mobile,
    message: req.body.message,
  });
  if (legit) {
    userSchema
      .findOne({ email: legit.email }, { number_of_request: 5 })
      .then((data) => {
        if (data) {
          if (data.number_of_request == 5) {
            res.json({
              message: "You've exceded number of request per month",
              success: false,
              status: 200,
            });
          } else if (data.number_of_request < 5) {
            request.save((err) => {
              if (err) {
                res.json({
                  error: err,
                  message: "Unable to make request",
                  success: false,
                  status: 200,
                });
              } else {
                userSchema
                  .updateOne(
                    { email: legit.email },
                    { number_of_request: data.number_of_request + 1 }
                  )
                  .then((data) => {
                    if (data) {
                      res.json({
                        message:
                          "We will get back to you when your request is met, check back after 24 hours",
                        data: data,
                        success: true,
                        status: 200,
                      });
                    } else {
                      res.json({
                        message: "Something went wrong",
                        success: false,
                        status: 200,
                      });
                    }
                  });
              }
            });
          }
        } else {
          res.json({
            message:
              "Unable to make request at the moment logout and login again",
            success: false,
            status: 200,
          });
        }
      });
  } else {
    res.status(401).json({ message: "Unauthorized Request" });
  }
});

router.get("/get-request-by-id/:request_id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    adminSchema.getRequestById(req.body, req.params, (err, data) => {
      if (err) {
        res.json({
          message: "Unable to get request try again after sometime",
          status: 200,
          success: false,
        });
      } else {
        res.json({
          message: "Request Retrieved",
          status: 200,
          success: true,
          data,
        });
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized Request", status: 200, success: false });
  }
});

router.put("/update-request-by-id/:request_id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    adminSchema.updateRequest(req.body, req.params, (err, data) => {
      if (err) {
        res.json({
          message: "Unable to update request try again after sometime",
          status: 200,
          success: false,
        });
      } else {
        res.json({ message: "Request Updated", status: 200, success: true });
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized Request", status: 200, success: false });
  }
});

module.exports = router;
