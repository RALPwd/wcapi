const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;