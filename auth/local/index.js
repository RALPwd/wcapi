const {Router} = require('express')

const {handlePlayerLogin} = require('./local.controller');

const router = Router();

router.post('/login',handlePlayerLogin)

module.exports = router;