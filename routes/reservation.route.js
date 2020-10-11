const express = require("express");
const router = express.Router();
const { makeReservation, getOneReservation, updateReservation, getMyReservations } = require("../controller/reservation.controller");
const verifyToken = require('../middleware/authorization');



router.post("/createReservation", verifyToken, makeReservation);


router.get("/getReservationById", verifyToken, getOneReservation);


router.put("/updateReservationById", verifyToken, updateReservation);


router.get("/myReseravations", verifyToken, getMyReservations);

module.exports = router;
