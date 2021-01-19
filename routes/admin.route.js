const express = require("express");
const { basicAuth } = require("../config/basicAuthentication");
const router = express.Router();
const { verifyToken } = require('../middleware/authorization');
const { createAdmin, loginAdmin, findAdmin, updateUserStatus, logOut } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/createAdmin", basicAuth, findAdmin, createAdmin);


// - - -  - - - - - - - - - - - - - LOGIN ADMIN - - - - - - - - - - - - - - - //
router.post("/loginAdmin", basicAuth, loginAdmin);


//- - - - - - - - - - - - - - - - - - -UPDATE - STATUS - OF - USER - - - - - - - - - - - - - - - - - - - - //
router.put("/updateStatus", verifyToken, updateUserStatus);

router.get('logOut', logOut)

module.exports = router;