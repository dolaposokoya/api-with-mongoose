let express = require("express"),
  multer = require("multer"),
  jwt = require("jsonwebtoken"),
  verifyToken = require("../model/auth");
let router = express.Router();
let reserveService = require("../model/reservation");
config = require("../DB");

router.post("/create-reservation", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    reserveService.createReserve(req.body, legit.user_id, (err, data) => {
      if (err) {
        res.json({
          message: "Unable to make request",
          success: false,
          status: 200,
        });
        console.error(err);
      } else {
        config
          .getDB()
          .query(
            `INSERT INTO bank(reserve_id, user_id ) VALUES ('${data.insertId}','${legit.user_id}')`
          );
        res.json({
          message: "We will get back to you when your request is met",
          success: true,
          status: 200,
        });
        console.error(req.body);
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized Request" });
  }
});

router.get("/get-reservation-by-id/:request_id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    reserveService.getReserveById(req.body, req.params, (err, data) => {
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

router.put("/update-reservation-by-id/:reserve_id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    reserveService.updateRequest(req.body, req.params, (err, data) => {
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
