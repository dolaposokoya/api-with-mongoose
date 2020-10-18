<<<<<<< HEAD
const express = require("express");
const { basicAuth } = require("../config/basicAuthentication");
const router = express.Router();
const { createAdmin } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", basicAuth, createAdmin);



=======
const express = require("express");
const router = express.Router();
const { createAdmin } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", createAdmin);



>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
module.exports = router;