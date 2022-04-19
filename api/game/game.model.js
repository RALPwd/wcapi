const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    playerOneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    playerTwoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    wordToGuess: String,
    attemptsPlayer1: [String],
    attemptsPlayer2: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);