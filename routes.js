const player =  require ('./api/player');
const authLocal = require('./auth/local');
const donations = require('./api/donations');

function routes (app) {
  app.use('/api/players', player);
  app.use('/auth/local', authLocal);
  app.use('/api/donations', donations);
}

module.exports = routes;