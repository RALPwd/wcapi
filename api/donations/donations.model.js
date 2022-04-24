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
    bill:{
      ref_payco:{
        type:Number,
        required:true
      },
      factura:{
        type:String,
        required:true
      },
      autorizacion:{
        type:String,
        required:true
      },
      fecha:{
        type:String,
        required:true
      }
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const donation = mongoose.model("Donation", DonationsSchema);
module.exports = donation;

