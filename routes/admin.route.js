const express = require("express");
const router = express.Router();
const { createAdmin } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", createAdmin);



module.exports = router;