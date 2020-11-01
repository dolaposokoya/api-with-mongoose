const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authorization');
const { checkRequest, makeRequest, myRequests, getOneRequest, updateRequest } = require("../controller/request.controller");


// - - - - - - - - - - - -  - - - - - - - - - - - - -  - CREATE REQUEST - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/createRequest", verifyToken, checkRequest, makeRequest);

router.get("/myRequest", verifyToken, myRequests);

router.get("/getRequestById", verifyToken, getOneRequest);

router.put("/updateRequestById", verifyToken, updateRequest);

module.exports = router;
