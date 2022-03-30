const player =  require ('./api/player');

function routes (app) {
  app.use('/api/players', player);
}

module.exports = routes;