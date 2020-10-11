require('dotenv').config()
const express = require("express");
const { basicAuth } = require('../config/basicAuthentication');
const router = express.Router();
const { fileUpload } = require('../controller/file.controller');



// - - - - - - - - - - - - - - - - - - - - - - - -  - Upload Image - - - - - - -- - - - - - - - - - - - - - - - - - - - //

router.post("/uploadFile", basicAuth, fileUpload);

module.exports = router