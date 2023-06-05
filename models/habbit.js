const mongoose = require("mongoose");

const habbit_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    tracks: [
      {
        date: String,
        status: {type: String, enum: ["None","Done","Not Done"], default:"None"}
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habbit = mongoose.model("Habbit", habbit_Schema);

module.exports = Habbit;
