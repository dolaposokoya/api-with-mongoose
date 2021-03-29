const express = require("express");
const { basicAuth } = require('../config/basicAuthentication');
const { deleteFile } = require('../controller/file.controller');
const router = express.Router();
const { findUser, registerUser, getAllUser, getOneUser, loginUser, allGroup, updateUser, forgotPassword, deleteUser, filterUser, contactUser, sortAllUser, logOutUser } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/authorization');
const { sendRequestMail } = require("../controller/mail.controller");
const { generateCookies } = require('../middleware/generateCookies');



//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/createUser", basicAuth, findUser, registerUser);

//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - ID - - - - - - - - - - - - - - - - -
router.get("/getUserById", verifyToken, getOneUser);


//- - - - - - - - - - - - - - GET - ALL - DATA - FROM - USER - MODULE - - - - - - - - - - - - - - - - -//
router.get("/getAllUser", verifyToken, getAllUser);

//- - - - - - - - - - - - - - GET - ALL - DATA - FROM - USER - MODULE - - - - - - - - - - - - - - - - -
router.get("/filterUser", verifyToken, filterUser);

//- - - - - - - - - - - - - - SORT - ALL - DATA - FROM - USER - MODULE - - - - - - - - - - - - - - - - -
router.get("/sortAllUser", verifyToken, sortAllUser);

//- - - - - - - - - - - - - - LOGIN - USER - BY - USER'S - MAIL - & - PASSWORD - - - - - - - - - - - - - - - - -
router.post("/loginUser", basicAuth, loginUser, generateCookies);

//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - BLOOD GROUP - - - - - - - - - - - - - - - - -
router.get("/bloodAllGroup", verifyToken, allGroup);

//- - - - - - - - - - - - - - - - - - - - - -UPDATE - DATA - OF - USER - - - - - - - - - - - - - - - - - - - - - - - - //
router.put("/updateUser", verifyToken, updateUser);

// - - - - - - - - - - - - - - - - -  -  - - CHANGE PASSWORD - - - - -- - - - - - - - - - - - - - - - - - - - - - -//
router.put("/forgetPassword", basicAuth, forgotPassword);

//- - - - - - - - - - - - - - DELETE - DATA - OF - USER- ROLE - MODULE - BY -ID - - - - - - - - - - - - - -
router.delete("/deleteUser", verifyToken, deleteUser, deleteFile);

router.get("/contactUser", verifyToken, contactUser, sendRequestMail);

router.get('logOutUser', logOutUser)
/**
 * Delete User
 */
// router.delete('/deleteOneUser', verifyToken, getUserImage, deleteFile, deleteUser);

module.exports = router;