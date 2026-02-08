const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { adminModel, coursesModel } = require("../db/db.js");
const {
  adminSignup,
  adminSignin,
  adminauth,
} = require("../middleWares/admin.js");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const saltRounds = 5;
const { ADMIN_JWT } = require("../config");

router.post("/signup", adminSignup, async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await adminModel.create({
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
router.post("/signin", adminSignin, async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, ADMIN_JWT);
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

router.post("/course", adminauth, async (req, res) => {
  const zodSchema = z.object({
    title: z.string().min(3).max(150),
    description: z.string().min(3).max(500),
    price: z.number(),
    imageUrl: z.string(),
  });
  const response = zodSchema.safeParse(req.body);
  if (!response.success) {
    res.json({
      msg: response.error.issues.map((val) => val.message),
    });
    return;
  }
  const { title, description, price, imageUrl } = req.body;

  try {
    await coursesModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: req.id,
    });
    res.json({
      msg: "course added sucessfully",
      creatorId: req.id,
    });
  } catch (error) {
    res.json({
      msg: "Error" + error,
    });
  }
});
router.put("/course", adminauth, async (req, res) => {
  const adminId = req.id;
  const { title, description, price, imageUrl, courseID } = req.body;

  try {
    const data = await coursesModel.updateOne(
      {
        _id: courseID,
        creatorId: adminId,
      },
      {
        $set: {
          title,
          description,
          price,
          imageUrl,
        },
      },
      {
        upsert: true,
      },
    );
    res.json({
      msg: "course updated",
      data,
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});

router.get("/course/bulk", adminauth, async (req, res) => {
  const adminId = req.id;
  try {
    const data = await coursesModel.find({ creatorId: adminId });
    res.json({
      data,
    });
  } catch (error) {
    res.json({
      msg: "Error: " + errro,
    });
  }
});

module.exports = router;
