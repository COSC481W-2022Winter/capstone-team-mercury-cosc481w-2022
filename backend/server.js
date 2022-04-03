require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

//Adding the explore page 
const http = require('http');

require('./cutestpawDB');
//-----
app.use(bodyParser.json());
app.use(cors());
//explore page 
app.use(express.json());
app.use(express.static('express'));
//default for the URL 
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //dirname will resolve to the project folder
}); 

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
const exp = require('constants');
app.use('/api/loginAPI', loginAPI);
//-----
app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
//-----
const Server= http.createServer(app);
const port = process.env.PORT || 10577;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

