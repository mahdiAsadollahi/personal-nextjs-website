const { default: mongoose } = require("mongoose");
const { unique } = require("next/dist/build/utils");

const schema = new mongoose.Schema(
  {
    slug: {
      type: "String",
      unique: true,
      rquired: true,
    },
    title: {
      type: "String",
      rquired: true,
    },
    htmlContent: {
      type: "String",
      required: true,
    },
    coverUrl: {
      type: "Sting",
      rquired: true,
    },
    coverAlt: {
      type: "String",
      rquired: true,
    },
    categoryId: {
      type: "String",
    },
    status: {
      type: "String",
      enum: ["draft", "published"],
      required: true,
    },
    readTime: {
      type: "Number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Article || mongoose.model("Article", schema);

module.exports = model;
