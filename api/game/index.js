const { Router } = require('express');

const {
  handleCreateGame,
  handleGetGame,
  handleEditGame,
} = require('./game.controller');

const router = Router();

const { isAuthenticated } = require("../../auth/auth.services");

router.post('/newgame', isAuthenticated(), handleCreateGame);
router.patch('/edit/:id', handleEditGame);
router.get('/:id', handleGetGame);

module.exports = router;
