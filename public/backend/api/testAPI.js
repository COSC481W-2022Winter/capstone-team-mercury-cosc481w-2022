var express = require("express");
const app = express();

var router = express.Router();
//var games = "O,O,,X,O,X,,O,,,X,X,,O,X,O,,X,,";
var games = "O,O,,X,O,X,,O,,";
var bodyParser = require('body-parser');


const Game = require('../models/game');



router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(req, res, next) {
	//res.send(games);
    let gamesString = '';
    console.log("Getting games...");
    
    //query DB for games
    Game.find().sort({_id: -1}).limit(5).then((result) => {
        console.log("Result = " + result);
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].board);
            gamesString = gamesString + result[i].board;
        }
        console.log("Success!");
        console.log(gamesString);
        res.send(gamesString.substring(0, gamesString.length-1));
    })
    .catch((err) => {
        console.log(err);
    });
    console.log(gamesString);
});

router.post("/send", function(req, res) {
    //create game data
	var data = req.body.game +",";
	console.log(data);
	games = data + games;

    console.log("Adding game...")
    //add game to DB
    const game = new Game({
        board: data
    });
    game.save()
    .then((result) => {
        console.log(result);
        console.log("Success!");
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;