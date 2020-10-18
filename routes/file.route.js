<<<<<<< HEAD
require('dotenv').config()
const express = require("express");
const { basicAuth } = require('../config/basicAuthentication');
const router = express.Router();
const { fileUpload } = require('../controller/file.controller');



// - - - - - - - - - - - - - - - - - - - - - - - -  - Upload Image - - - - - - -- - - - - - - - - - - - - - - - - - - - //

router.post("/uploadFile", basicAuth, fileUpload);

=======
require('dotenv').config()
const express = require("express");
const router = express.Router();
const { imageUpload } = require('../controller/file.controller');



// - - - - - - - - - - - - - - - - - - - - - - - -  - Upload Image - - - - - - -- - - - - - - - - - - - - - - - - - - - //

router.post("/uploadFile", imageUpload);

>>>>>>> 19b8d41739230428bf5fb61908e3dac61d7e42eb
module.exports = router