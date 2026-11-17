const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({});

const model = mongoose.models.Article || mongoose.model("Article", schema);

module.exports = model;
