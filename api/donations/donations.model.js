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
        type:string,
        required:true
      },
      autorizacion:{
        type:string,
        required:true
      },
      fecha:{
        type:string,
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

