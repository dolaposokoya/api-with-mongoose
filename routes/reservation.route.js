let express = require("express"),
  verifyToken = require("../model/auth");
let router = express.Router();
let reservationSchema = require("../model/reservation");
config = require("../DB");

router.post("/create-reservation", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  const reservation = new reservationSchema({
    user_id: legit.user_id,
    donor_name: req.body.donor_name,
    age: req.body.age,
    gender: req.body.gender,
    donor_mobile: req.body.donor_mobile,
    weight: req.body.weight,
    hospital_name: req.body.hospital_name,
    hospital_address: req.body.hospital_address,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    reservation_date: req.body.reservation_date,
  });
  if (legit) {
    reservation.save(function (err, data) {
      if (err) {
        res.status(200).json({
          message: "Unable to make reservation",
          error: err,
          success: false,
        });
      } else {
        res.status(200).json({
          message: "Reservation made",
          data: data,
          success: true,
        });
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
