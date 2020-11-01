const express = require("express");
const router = express.Router();
const { getAllBloodGroup, createBloodGroup } = require("../controller/bloodgroup.controller");
const { basicAuth } = require('../config/basicAuthentication');


// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", createBloodGroup);
// - - - - - - - - - -  - - - - - -  - - - - GET METADATA  - - - - - - - - - - - - - - - - - - //
router.get("/bloodAllGroup", basicAuth, getAllBloodGroup);


module.exports = router;

