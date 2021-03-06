const {
  createGame,
  getGame,
  editGame,
} = require('./game.service');

async function handleCreateGame(req, res) {
  try {
    const game = await createGame(req.body);
    res.status(201).json({game: game, status: 201});
  } catch (error) {
    res.status(400).json({ error: error.message, status: 400 });
  }
}

async function handleGetGame(req, res) {
  try {
    const game = await getGame(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function handleEditGame(req, res) {
  try {
    const game = await editGame(req.params.id, req.body);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { handleCreateGame, handleGetGame, handleEditGame };
