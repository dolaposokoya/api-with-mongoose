<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { getAllBloodGroup, createBloodGroup } = require("../controller/bloodgroup.controller");
const { basicAuth } = require('../config/basicAuthentication');


// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", createBloodGroup);
// - - - - - - - - - -  - - - - - -  - - - - GET METADATA  - - - - - - - - - - - - - - - - - - //
router.get("/bloodAllGroup", basicAuth, getAllBloodGroup);


module.exports = router;
=======
const express = require("express");
const router = express.Router();
const { getAllBloodGroup, createBloodGroup } = require("../controller/bloodgroup.controller");



// - - -  - - - - - - - - - - - - - - - - - - - - - -  - CREATE METADATA - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/Metadata", createBloodGroup);
// - - - - - - - - - -  - - - - - -  - - - - GET METADATA  - - - - - - - - - - - - - - - - - - //
router.get("/bloodAllGroup", getAllBloodGroup);


module.exports = router;
>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
