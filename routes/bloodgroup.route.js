const express = require("express");
const router = express.Router();
const { getAllBloodGroup, createBloodGroup } = require("../controller/bloodgroup.controller");
const { basicAuth } = require('../config/basicAuthentication');
const { verifyToken } = require('../middleware/authorization');


// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", createBloodGroup);
// - - - - - - - - - -  - - - - - -  - - - - GET METADATA  - - - - - - - - - - - - - - - - - - //
router.get("/bloodAllGroup", basicAuth, verifyToken,getAllBloodGroup);


module.exports = router;

