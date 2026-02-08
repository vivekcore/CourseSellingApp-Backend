const express = require("express");
const router = express.Router();
const { userauth } = require("../middleWares/user");
const { purchasesModel, coursesModel } = require("../db/db");

router.post("/purchase", userauth, async (req, res) => {
  const userId = req.id;
  const courseId = req.body.courseId;
  try {
    await purchasesModel.create({
      courseId,
      userId,
    });
    res.json({
      msg: "purchases sucessfully",
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});

router.get("/preview", async (req, res) => {
  try {
    const courses = await coursesModel.find({});
    res.json({
      courses: courses,
    });
  } catch (error) {
    res.json({
      msg: "Error: " + error,
    });
  }
});

module.exports = router;
