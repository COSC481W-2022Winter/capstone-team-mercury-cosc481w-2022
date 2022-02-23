require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
//NOTE: Only one of these can be used at a time. Unomment accordingly when 
//you need to use the cutestpaw DB
// require('./database');
require('./cutestpawDB');
//-----
app.use(bodyParser.json());
app.use(cors());

//-----
// API
const testAPI = require('./api/testAPI');
app.use('/api/testAPI', testAPI);

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
app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
//-----
const port = process.env.PORT || 10577;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
