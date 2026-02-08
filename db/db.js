const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const user = new Schema({
  firstname: { type: String, require: true, minLength: 3, maxLength: 20 },
  lastname: { type: String, maxLength: 20 },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const admin = new Schema({
  firstname: { type: String, require: true, minLength: 3, maxLength: 20 },
  lastname: { type: String, maxLength: 20 },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const courses = new Schema({
  title: { type: String, require: true, minLength: 3, maxLength: 150 },
  description: { type: String, minLength: 3, maxLength: 500 },
  price: { type: Number, require: true },
  imageUrl: { type: String },
  creatorId: { type: ObjectID, require: true },
});

const purchases = new Schema({
  courseId: { type: ObjectID, require: true },
  userId: { type: ObjectID, require: true },
});

const userModel = mongoose.model("user",user );
const adminModel = mongoose.model("admin",admin );
const coursesModel = mongoose.model("courses",courses );
const purchasesModel = mongoose.model("purchases",purchases );

module.exports = { userModel, adminModel, coursesModel, purchasesModel };
