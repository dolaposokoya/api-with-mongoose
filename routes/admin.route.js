const express = require("express");
const { basicAuth } = require("../config/basicAuthentication");
const router = express.Router();
const { createAdmin } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", basicAuth, createAdmin);



module.exports = router;