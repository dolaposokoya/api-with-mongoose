require('dotenv').config()
const express = require("express");
const router = express.Router();
const { findUser, registerUser, getAllUser, getOneUser, loginUser, allGroup, updateUser, forgotPassword, deleteUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/authorization');


//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/createUser", findUser, registerUser);

//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - ID - - - - - - - - - - - - - - - - -
router.get("/getUserById", verifyToken, getOneUser);


//- - - - - - - - - - - - - - GET - ALL - DATA - FROM - USER - MODULE - - - - - - - - - - - - - - - - -
router.get("/getAllUser", verifyToken, getAllUser);


//- - - - - - - - - - - - - - LOGIN - USER - BY - USER'S - MAIL - & - PASSWORD - - - - - - - - - - - - - - - - -
router.post("/loginUser", loginUser);

//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - BLOOD GROUP - - - - - - - - - - - - - - - - -
router.get("/bloodAllGroup", verifyToken, allGroup);

//- - - - - - - - - - - - - - - - - - - - - -UPDATE - DATA - OF - USER - - - - - - - - - - - - - - - - - - - - - - - - //
router.put("/updateUser", verifyToken, updateUser);

// - - - - - - - - - - - - - - - - -  -  - - CHANGE PASSWORD - - - - -- - - - - - - - - - - - - - - - - - - - - - -//
router.put("/forgetPassword", forgotPassword);

//- - - - - - - - - - - - - - DELETE - DATA - OF - USER- ROLE - MODULE - BY -ID - - - - - - - - - - - - - -
router.delete("/deleteUser", verifyToken, deleteUser);

//- - - - - - - - - - - - - -EXPORT - THIS - MODULES' ALL - FUNCTION - TO - MAIN - JS - FILE - - - - - - - - - - - - - -

module.exports = router;