const Game = require('./game.model');
// const Player = require('../player.model');

async function createGame(game) {
  const newGame = await Game.create(game);
  return newGame;
}


async function getGame(id) {
  const game = await Game.findById(id);
  return game;
}

async function editGame(id, game) {
  const updatedGame = await Game.findByIdAndUpdate(id, game);
  return updatedGame;
}


module.exports = { createGame, getGame, editGame };
