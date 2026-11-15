const { default: mongoose } = require("mongoose");
const { unique } = require("next/dist/build/utils");

const schema = new mongoose.Schema({
  nickname: {
    type: "String",
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  username: {
    type: "String",
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
    minlength: 8,
    trim: true,
  },
  role: {
    type: "String",
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  refreshToken: String,
});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
