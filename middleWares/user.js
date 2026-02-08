const jwt = require("jsonwebtoken")
const {USER_JWT} = require("../config")
const {userModel} = require("../db/db")
const {z} = require("zod")
const bcrypt = require("bcrypt")

const userSignup = async (req, res, next) => {
  const userSchema = z.object({
    firstname: z.string().min(3).max(20),
    lastname: z.string().max(20),
    email: z.email(),
    password: z.string(),
  });
  const response = userSchema.safeParse(req.body);
  if (!response.success) {
    res.json({
      msg: response.error.issues.map((val) => val.message),
    });
    return;
  }
  const { email } = req.body;
  const data = await userModel.findOne({ email });
  if (data) {
    res.json({
      mag: "User already exists try Sign In",
    });
  }
  next();
};

const userSignin = async (req, res, next) => {
  const { email, password } = req.body;

  const response = await userModel.findOne({ email });
  if (response) {
    bcrypt.compare(password, response.password, (err, result) => {
      if (result) {
        req.user = response;
        next();
      } else {
        res.json({
          msg: err,
        });
      }
    });
  } else {
    res.json({
      mag: "User does not exist try sign up",
    });
  }
};

const userauth = (req, res, next) => {
  const token = req.headers.token;
  try {
    const response = jwt.verify(token, USER_JWT);
    req.id = response.id;
    next();
  } catch (error) {
    res.json({
      msg: "You are not authrized"
    });
  }
};

module.exports = {
    userauth,
    userSignup,
    userSignin
}