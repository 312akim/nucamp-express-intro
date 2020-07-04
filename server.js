const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express(); //Returns express server application

//Config morgan to log using development version
app.use(morgan('dev'));

//When server receives requests w/ JSON formatted data in body, body parser will handle 
    //parsing the data into prop of request object to make it more easily accessible.
app.use(bodyParser.json());

//catch-all for all http verbs
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //Pass control of application routing to next relevant routing method after this 1.
    next(); //Will continue to get or post etc below depending on req
});

app.get('/campsites', (req, res) => {
    //Status code & headers already set by app.all method.
    res.end('Will send all the campsites to you');
});

//Post typically carry info in body of message. Body parser will take the prop and auto set it up as prop of request.body object.
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    //Status code & headers already set by app.all method.
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

//Post typically carry info in body of message. Body parser will take the prop and auto set it up as prop of request.body object.
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
     with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});



                    //Variable in node that refers to absolute path of current directory of file it's in.
app.use(express.static(__dirname + '/public'));

//Return same response to any request. Callback function here is middleware function
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

//Create instance of http server class & start listening to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});