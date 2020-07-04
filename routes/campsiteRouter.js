const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')
//catch-all for all http verbs
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //Pass control of application routing to next relevant routing method after this 1.
    next(); //Will continue to get or post etc below depending on req
})
.get((req, res) => {
    //Status code & headers already set by app.all method.
    res.end('Will send all the campsites to you');
})
//Post typically carry info in body of message. Body parser will take the prop and auto set it up as prop of request.body object.
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter;