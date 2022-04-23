const mongoose = require("mongoose");

const DonationsSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const donation = mongoose.model("Donation", DonationsSchema);
module.exports = donation;

