require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

require('./cutestpawDB');
//-----
app.use(bodyParser.json());
app.use(cors());

//-----
// API usage

const userAPI = require('./api/userAPI');
app.use('/api/userAPI', userAPI);

const contentfeedAPI = require('./api/contentfeedAPI');
app.use('/api/contentfeedAPI', contentfeedAPI);

const postAPI = require('./api/postAPI');
app.use('/api/postAPI', postAPI);

const profileAPI = require('./api/profileAPI');
app.use('/api/profileAPI', profileAPI);

const loginAPI = require('./api/loginAPI');
app.use('/api/loginAPI', loginAPI);
//-----
//app.use(express.static(path.join(__dirname, '../build/')))

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//-----
const port = process.env.PORT || 10577;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
