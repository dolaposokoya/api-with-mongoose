const express = require("express");
const router = express.Router();
const { createAdmin, getAllGroup } = require('../controller/admin.controller')

// - - -  - - - - - - - - - - - - - CREATE ADMIN - - - - - - - - - - - - - - - //
router.post("/create-admin", createAdmin);

// - - - - - - - - - - - -  - - - - - - - - - - - - - - GET METADATA  - - - - - - - - - - - - - - - - - - - - - - - - //
router.get("/blood-all-group", getAllGroup);


module.exports = router;