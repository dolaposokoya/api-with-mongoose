const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authorization');
var pusher = require('../config/pusher');
const { checkRequest, makeRequest, myRequest } = require("../controller/request.controller");



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
      if (data) {
        pusher.trigger('blood', 'my-blood', { data: data });
        res.json({ message: "Data retrieved", data: data, success: true, status: 200, });
      } else {
        res.json({ message: "Unable to retrieve data", success: false, status: 200, });
      }
    });
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message, success: false, status: 500 });
    }
  }
});

// - - - - - - - - - - - -  - - - - - - - - - - - - -  - CREATE REQUEST - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/createRequest", verifyToken, checkRequest, makeRequest);

router.get("/myRequest", verifyToken, myRequest);

router.put("/update-request-by-id/", (req, res) => {
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
