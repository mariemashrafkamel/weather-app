// Setup empty JS object to act as endpoint for all routes
//APP API Endpoint:
projectData = {};

//set port to 8080
const port = 8080;

//first requirement:
// Require Express to run server and routes
//setup express ,bodyParser and cors:
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
//////////////////////////
//second requirement:
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//////////////////////////////////////
// Initialize the main project folder
app.use(express.static('website'));

// Respond with JS object when a GET request is made to the homepage
app.get('/all', function(req, res) {
    //send projectdata
    res.send(projectData);
})


//POST: to send info to server:
app.post('/add', addinfo)

function addinfo(req, res) {
    console.log('data of server', req.body);
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.send(projectData);
}


/////third requirement:
// Setup Server

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })