const express = require("express");
const router = express.Router();
const { validateToken } = require('../controller/token.controller');



//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - ID - - - - - - - - - - - - - - - - -
router.post("/validateToken", validateToken);


module.exports = router;