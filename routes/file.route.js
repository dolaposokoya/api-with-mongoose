require('dotenv').config()
const express = require("express");
const router = express.Router();
const { imageUpload } = require('../controller/file.controller');



// - - - - - - - - - - - - - - - - - - - - - - - -  - Upload Image - - - - - - -- - - - - - - - - - - - - - - - - - - - //

router.post("/uploadFile", imageUpload);

module.exports = router