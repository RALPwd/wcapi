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


module.exports = { createGame, getGame };
