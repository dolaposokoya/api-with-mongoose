let express = require("express"),
  multer = require("multer"),
  jwt = require("jsonwebtoken"),
  path = require("path"),
  bcrypt = require("bcryptjs"),
  verifyToken = require("../model/auth");
let router = express.Router();
let userSchema = require("../model/user");
var nodemailer = require("nodemailer");
var uuid = require("uuid");
var ObjectID = require("mongodb").ObjectID;
var base64 = require("base-64");
var jwtDecode = require("jwt-decode");

// Sending OTP to user email

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sokoya.webnexus@gmail.com",
    pass: "sokoya@webnexus2019",
    expires: 600,
  },
});

// USING MULTER FOR INSERTING FILES IN USER TABLE
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "public/images");
  },
  filename: function (request, file, callback) {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage }).single("profile_image");
// var upload = multer({ storage: storage }).fields([{ name: "user_img" }, { name: "cert_img" }]);

//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-user", (req, res) => {
  var filename = "";
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError)
      res.json({ message: "Unable to upload image" });
    else if (err)
      res.json({ message: "Something went wrong", error: err, success: false });
    else {
      req.body.profile_image = {
        fileType: res.req.file.mimetype,
        fileUrl: res.req.file.path,
        fileName: res.req.file.filename,
      };
      let id = Math.floor(Math.random() * 1000 * 1000),
        profile_id = base64.encode(id);
      password = req.body.password;
      req.body.password = bcrypt.hashSync(password, 10);
      const user = new userSchema({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        age: req.body.age,
        mobile: req.body.mobile,
        gender: req.body.gender,
        profile_image: req.body.profile_image,
        password: req.body.password,
        email: req.body.email,
        profile_id: profile_id,
      });
      userSchema.findOne({ email: req.body.email }).then((data) => {
        if (data) {
          res.json({
            message: "Email already exist",
            success: false,
            status: 200,
          });
        } else {
          user.save(function (err, data) {
            if (err) {
              console.log(`Error message ${err.message}`);
              res.json({
                message: "Unable to register",
                success: false,
                status: 200,
              });
            } else {
              res.json({
                message: "User Inserted",
                success: true,
                data: data,
                status: 200,
              });
            }
          });
        }
      });
    }
  });
});

//- - - - - - - - - - - - - - GET - ALL - DATA - FROM - USER - MODULE - - - - - - - - - - - - - - - - -
router.get("/get-all-user", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    userSchema.find().then((data) => {
      if (data) {
        res.json({
          message: "User retrieved",
          data: data,
          success: false,
          status: 200,
        });
      } else {
        res.json({ message: "User not present", success: false, status: 200 });
      }
    });
  } else {
    res.status(401).json({
      status: 200,
      hassuccessed: false,
      message: "Unauthorized Request",
    });
  }
});

//- - - - - - - - - - - - - - LOGIN - USER - BY - USER'S - MAIL - & - PASSWORD - - - - - - - - - - - - - - - - -
router.post("/login-user", (req, res) => {
  userSchema.findOne({ email: req.body.email }).then((data) => {
    let email = req.body.email;
    let plaintext = req.body.password;
    if (!data) {
      res.json({ message: "User not present", success: false, status: 200 });
    } else {
      if (data) {
        let hash = data.password;
        user_id = data._id;
        profile_id = data.profile_id;
        pwd = bcrypt.compareSync(plaintext, hash);
        if (pwd) {
          var token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 43200,
              User: true,
              email,
              user_id,
              profile_id,
            },
            "shhhhh"
          );
          res.json({
            message: "Login Successful",
            success: true,
            status: 200,
            token: token,
            user_id: user_id,
            profile_id: profile_id,
          });
        } else {
          res.json({
            message: "Email or password doesn't match",
            success: false,
            status: 200,
          });
        }
      } else {
        res.json({
          message: "Email doesn't exist",
          success: false,
          status: 200,
        });
      }
    }
  });
});
//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - BLOOD GROUP - - - - - - - - - - - - - - - - -
router.get("/blood-all-group", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    userSchema.find().then((data) => {
      if (data) {
        res.json({
          message: "User retrieved",
          data: data,
          success: false,
          status: 200,
        });
      } else {
        res.json({ message: "User not present", success: false, status: 200 });
      }
    });
  } else {
    res.status(401).json({
      status: 200,
      hassuccessed: false,
      message: "Unauthorized Request",
    });
  }
});

//- - - - - - - - - - - - - - UPDATE - DATA - OF - USER - MODULE - BY -ID - - - - - - - - - - - - - -
router.put("/update-user", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    password = req.body.password;
    req.body.password = bcrypt.hashSync(password, 10);
    let myDate = new Date();
    console.log("User Date", myDate.toString());
    const update = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      age: req.body.age,
      mobile: req.body.mobile,
      gender: req.body.gender,
      password: req.body.password,
      email: req.body.email,
      updatedAt: myDate.toString(),
    };
    if (req.body.email == "") {
      res.json({ message: "Email is empty", success: false, status: 200 });
    } else {
      userSchema
        .updateOne({ _id: legit.user_id }, req.body)
        .then((data) => {
          console.log("Data", data, update);
          if (data) {
            res.json({
              message: "user updated",
              success: true,
              status: 200,
            });
          } else {
            res.json({
              message: "user not updated",
              success: false,
              status: 200,
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  } else {
    res.status(401).json({
      status: 200,
      hassuccessed: false,
      message: "Unauthorized Request",
    });
  }
});

//- - - - - - - - - - - - - - GET - DATA - FROM - USER - MODULE - BY - ID - - - - - - - - - - - - - - - - -
router.get("/get-user-by-id/:id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  var id = legit.id;
  console.log("Request id", id);
  if (legit) {
    userSchema.findById({ _id: id }).then((data) => {
      if (data) {
        res.json({
          message: "User reteived",
          data: data,
          success: true,
          status: 200,
        });
      } else {
        res.json({
          message: "Unable to reteive user",
          success: false,
          status: 200,
        });
      }
    });
  } else {
    res
      .status(401)
      .json({ status: 200, success: false, message: "Unauthorized Request" });
  }
});
//- - - - - - - - - - - - - - REQUEST FOR OTP - - - - - - - - - - - - - -

//- - - - - - - - - - - - - - VERIFY OTP - - - - - - - - - - - - - -
router.post("/verify", (req, res) => {
  userService.getContact(req.body, (err, data) => {
    var otp = req.body.otp;
    if (err) {
      res.json({
        status: 200,
        success: false,
        message: "Unable To Verify OTP.",
        error: err,
      });
    } else {
      if (data.length > 0) {
        let veri = data[0].otp;
        if (veri) {
          res.json({
            status: 200,
            success: true,
            message: "Request verified",
            data,
          });
        }
      } else {
        res.json({ status: 200, message: "OTP doesn't match" });
      }
    }
  });
});

//- - - - - - - - - - - - - - DELETE - DATA - OF - USER- ROLE - MODULE - BY -ID - - - - - - - - - - - - - -
router.delete("/delete-user/:id", (req, res) => {
  var legit = verifyToken.verify(req.headers.authorization);
  if (legit) {
    userService.deleteUser(req.body, req.params, (err, data) => {
      if (!err) {
        res.json({
          status: 200,
          success: true,
          message: "User is Deleted Successfully",
        });
      } else {
        res.json({
          status: 200,
          success: false,
          message: "Something went wrong.",
          error: err,
        });
      }
    });
  } else {
    res.status(401).json({
      status: 200,
      hassuccessed: false,
      message: "Unauthorized Request",
    });
  }
});

router.put("/forget-password", (req, res) => {
  email = req.body.email;
  password = req.body.password;
  req.body.password = bcrypt.hashSync(password, 10);
  userService.forgetPassword(req.body, (err, data) => {
    console.log("Parameterrr", req.body);
    if (err) {
      res.json({
        status: 200,
        success: false,
        message: "Error Occured",
        error: err,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        message: "Password Updated",
        data,
      });
    }
  });
});

//- - - - - - - - - - - - - -EXPORT - THIS - MODULES' ALL - FUNCTION - TO - MAIN - JS - FILE - - - - - - - - - - - - - -

module.exports = router;
