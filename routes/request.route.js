let express = require("express"),
  verifyToken = require("../model/auth");
let router = express.Router();
let requestSchema = require("../model/request");
let userSchema = require("../model/user");
let metaDataSchema = require("../model/metadata"),
  jwt = require("jsonwebtoken");
config = require("../DB");

// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", (req, res) => {
  const blooddata = new metaDataSchema({
    apositive: req.body.apositive,
    anegative: req.body.anegative,
    bpositive: req.body.bpositive,
    bnegative: req.body.bnegative,
    abpositive: req.body.abpositive,
    abnegative: req.body.abnegative,
    opositive: req.body.opositive,
    onegative: req.body.onegative,
  });
  blooddata.save(function (err, data) {
    if (err) {
      console.log(`Error message ${err.message}`);
      res.json({
        message: "Unable to create blood group",
        success: false,
        status: 200,
      });
    } else {
      res.json({
        message: "Blood group created",
        success: true,
        status: 200,
        data: data,
      });
    }
  });
});
// - - - - - - - - - - - -  - - - - - - - - - - - - - - GET METADATA  - - - - - - - - - - - - - - - - - - - - - - - - //
router.get("/blood-all-group", (req, res) => {
  try {
    metaDataSchema.find().then((data) => {
      console.log("data", data);
      if (data) {
        res.json({
          message: "Data retrieved",
          data: data,
          success: true,
          status: 200,
        });
      } else {
        res.json({
          message: "Unable to retrieve data",
          success: false,
          status: 200,
        });
      }
    });
  } catch (error) {
    if (error) {
      res
        .status(500)
        .json({ message: "Error occured", success: false, status: 500 });
    }
  }
});

// - - - - - - - - - - - -  - - - - - - - - - - - - -  - CREATE REQUEST - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/create-request", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  var request = new requestSchema({
    patient_name: req.body.patient_name,
    patient_mobile: req.body.patient_mobile,
    patient_email: req.body.patient_email,
    date_needed: req.body.date_needed,
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
    requestSchema.getRequestById(req.body, req.params, (err, data) => {
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
    requestSchema.updateRequest(req.body, req.params, (err, data) => {
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
