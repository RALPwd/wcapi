
const { getPlayerEmail,findOnePlayer,deletePlayer } = require("../../api/player/player.service");

const { signToken } = require("../auth.services");

async function handlePlayerLogin(req, res) {
  const { email, password } = req.body;

  try {
    const player = await getPlayerEmail(email);

    if (!player) {
      return res
        .status(401)
        .json({status:401, message: "Invalid email please check again " });
    }else if(!player.state){
         return res
        .status(401)
        .json({status:401, message: "please verify your email " });
    }

    const isMatch = await player.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status:401, message: "Invalid password please check again " });
    }

    const token = signToken(player.profile);
    return res.status(200).json({token,player});
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function hadleVerifyAccount(req,res){
  const {token}= req.params;
  try {
      const player = await findOnePlayer({passwordResetToken: token})

      if(!player){
        return res.status(400).json({message:'Invalid token'});
      }
      if(Date.now() > player.passwordResetExpires && player.passwordResetExpires !==null ){
        deletePlayer(player.email);
        return res.status(400).json({message:'Token expired'});
      }
      player.state= 1;
      player.passwordResetToken=null;
      player.passwordResetExpires=null

      await player.save();
      
      const jwtToken = signToken(player.profile);
      return res.status(200).json({message: 'Account verifed', token:jwtToken})
      
  } catch (error) {
      return res.status(400).json(error);
  }
}

module.exports = { handlePlayerLogin, hadleVerifyAccount };
