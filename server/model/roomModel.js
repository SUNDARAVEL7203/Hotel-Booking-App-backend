const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true
    },
    roomNumbers: {
      type: Number,
      required: true

    },
  });

  module.exports = mongoose.model("Room", roomSchema);