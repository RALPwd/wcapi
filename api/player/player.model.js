const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PlayerSchema = new mongoose.Schema(
  {
    nick: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 11,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: Number,
      required: true,
    },
    gamePlayed: {
      type: Number,
      required: true,
    },
    gameWon: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PlayerSchema.pre("save", async function (next) {
  const player = this;

  try {
    if (!player.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(player.password, salt);

    player.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

PlayerSchema.methods.comparePassword = async function (candidatePassword) {
  const player = this;
  return bcrypt.compare(candidatePassword, player.password);
};

PlayerSchema.virtual("profile").get(function () {
  const { email } = this;

  return {
    email,
  };
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
