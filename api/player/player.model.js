const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const playerSchema = new mongoose.Schema({
 nick:{
   type: String,
   required: true,
   trim: true,
   minlength: 4,
   maxlength:20,
 },
 name:{
   type: String,
   required: true,
   trim: true,
    minlength: 4,
   maxlength:20,
 },
 email:{
   type: String,
   required: true,
   trim: true,
   minlength: 11,

 },
 password:{
   type: String,
   required: true,
   trim: true,
 },
 birthday:{
   type: Date,
 },
 picture:{
   type: String,
   required: true,
   trim: true,
 },
 state:{
   type: Number,
   required: true,
 },
},{
  timestamps: true,
  versionKey: false,
})

playerSchema.pre('save', async function(next){
const player = this;

try {
  if(!player.isModified('password')){
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(player.password,salt);

  player.password=hash;
  return  next(user);

} catch (error) {
  return next(error);
}
});

player.methods.comparePassword = async function (candidatePassword){
  const player = this;
  return bcrypt.compare(candidatePassword,player.password)
}


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;