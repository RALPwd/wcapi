const { getAllPlayer,createPlayer } = require('./player.service');

async function handleGetAllplayer(req, res) {
  const player = await getAllPlayer();
  res.status(200).json(player);
}

async function handleCreatePlayer(req,res){
  const player = {...req.body,
    "picture":"https://i.imgur.com/I2aG4PJ.png",
    "state":0};
  try {

     const playerCreated = await createPlayer(player);
     res.status(201).json(playerCreated)

  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { handleGetAllplayer,handleCreatePlayer };

