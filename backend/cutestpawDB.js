var express = require("express");
const app = express();
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");

//connect to mongoDB
const uri = "mongodb+srv://wrathbun:cutestpaw42@cutestpaw.ocfde.mongodb.net/cutestPaw?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("cutestPaw Database Connected Successfully"))
    .catch(err => console.log(err));