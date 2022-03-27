const playerModel = require('./player.model');

function getAllUsers() {
  console.log('player.service.js');
  return playerModel.find();
}

module.exports = { getAllUsers };