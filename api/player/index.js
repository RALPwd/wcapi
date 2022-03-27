const { Router } = require('express');
const { handleGetAllUsers, handleGetUser } = require('./player.controller');

(() => {
  console.log('index.js');
})();

const router = Router();

router.get('/', handleGetAllUsers);
// router.get('/:id', handleGetUser);

module.exports = router;