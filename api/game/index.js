const { Router } = require('express');

const {
  handleCreateGame,
  handleGetGame,
  handleEditGame,
} = require('./game.controller');

const router = Router();

router.post('/newgame', handleCreateGame);
router.patch('/game/edit/:id', handleEditGame);
router.get('/game/:id', handleGetGame);

module.exports = router;
