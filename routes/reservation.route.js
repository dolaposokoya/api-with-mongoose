<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { makeReservation, getOneReservation, updateReservation, getMyReservations } = require("../controller/reservation.controller");
const verifyToken = require('../middleware/authorization');



router.post("/createReservation", verifyToken, makeReservation);


router.get("/getReservationById", verifyToken, getOneReservation);


router.put("/updateReservationById", verifyToken, updateReservation);


router.get("/myReseravations", verifyToken, getMyReservations);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const { makeReservation } = require("../controller/reservation.controller");
const verifyToken = require('../middleware/authorization');

router.post("/createReservation", verifyToken, makeReservation);


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
    res.sendStatus(403)
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
        res.json({
          message: "Request Updated",
          status: 200,
          success: true
        });
      }
    });
  } else {
    res.sendStatus(403)
  }
});

module.exports = router;
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
