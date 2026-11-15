const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  nickname: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
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
