const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { userModel, purchasesModel } = require("../db/db.js");
const {
  userSignup,
  userSignin,
  userauth
} = require("../middleWares/user.js");
const jwt = require("jsonwebtoken");
const { USER_JWT } = require("../config.js");

const saltRounds = 5;
router.post("/signup", userSignup, async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await userModel.create({
      firstname,
      lastname,
      email,
      password: hash,
    });

    res.json({
      msg: "signup sucessfully",
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});
router.post("/signin", userSignin, async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, USER_JWT);
    res.json({
      msg: "Signin sucessfully",
      token,
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});

router.get("/purchases",userauth, async (req, res) => {
 const userId = req.id;
 try {
  const data = await purchasesModel.find({
    userId,
  })
  res.json({
    purchases: data,
  })
 } catch (error) {
  res.json({
    msg: "Error: "+error
  })
 } 
});

module.exports = router;
