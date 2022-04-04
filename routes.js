const player =  require ('./api/player');
const authLocal = require('./auth/local');
const donations = require('./api/donations');

function routes (app) {
  app.use('/api/players', player);
  app.use('/auth/local', authLocal);
<<<<<<< HEAD
  app.use('/api/donations', donations);
=======
  app.use('/api/games', game);
>>>>>>> Ensayando que funcione
}

module.exports = routes;