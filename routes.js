const player =  require ('./api/player');
const authLocal = require('./auth/local');

function routes (app) {
  app.use('/api/players', player);
  app.use('/auth/local', authLocal);
}

module.exports = routes;