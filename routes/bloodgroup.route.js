const express = require("express");
const router = express.Router();
const { getAllBloodGroup, createBloodGroup } = require("../controller/bloodgroup.controller");



// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", createBloodGroup);
// - - - - - - - - - -  - - - - - -  - - - - GET METADATA  - - - - - - - - - - - - - - - - - - //
router.get("/bloodAllGroup", getAllBloodGroup);


module.exports = router;
