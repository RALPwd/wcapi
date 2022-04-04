const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    playerOneId: String,
    playerTwoId: String,
    winnerId: String,
    wordToGuess: String,
    attemptsPlayer1: [String],
    attemptsPlayer2: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);