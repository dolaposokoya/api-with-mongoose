const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authorization');
const { checkRequest, makeRequest, myRequest } = require("../controller/request.controller");


// - - - - - - - - - - - -  - - - - - - - - - - - - -  - CREATE REQUEST - - - - - - - - - - - - - - - - - - - - - - - //
router.post("/createRequest", verifyToken, checkRequest, makeRequest);

router.get("/myRequest", verifyToken, myRequest);

router.put("/updateRequestById", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    requestSchema.updateRequest(req.body, req.params, (err, data) => {
      if (err) {
        res.json({
          message: "Unable to update request try again after sometime",
          status: 200,
          success: false,
        });
      } else {
        res.json({ message: "Request Updated", status: 200, success: true });
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized Request", status: 200, success: false });
  }
});

module.exports = router;
