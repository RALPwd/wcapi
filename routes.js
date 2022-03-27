const player =  require ('./api/player');

function routes (app) {
  console.log('routes.js');
  app.use('/api/players', player);
}

module.exports = routes;