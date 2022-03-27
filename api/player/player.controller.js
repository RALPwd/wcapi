const { getAllUsers } = require('./player.service');

async function handleGetAllUsers(req, res) {
  console.log('player.controller.js');
  const player = await getAllUsers();
  res.json(player);
}

// async function handleGetUser(req, res) {
//   const { id } = req.params;
//   const player = await getUser(id);

//   if (!player) {
//     res.status(404).json({ message: 'Player not found' });
//   } else {
//     res.json(player);
//   }
// }

module.exports = { handleGetAllUsers };

