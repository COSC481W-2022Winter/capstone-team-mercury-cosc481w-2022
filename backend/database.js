var express = require("express");
const app = express();
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");

//connect to mongoDB
const uri = "mongodb+srv://gtcolling:test1234@cluster0.w0d7u.mongodb.net/gameDB?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));