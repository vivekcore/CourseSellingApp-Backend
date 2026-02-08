require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const courseRouter = require("./routes/courseRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(PORT, async () => {
  await mongoose.connect(DATABASE_URL);
  console.log(`Server listning at ${PORT}`);
});
