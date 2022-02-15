const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    board: {
        type: String,
        required: true
    }
}, {id: true}, {timestamps: true});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;