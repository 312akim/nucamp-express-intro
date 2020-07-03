const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express(); //Returns express server application

//Return same response to any request. Callback function here is middleware function
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

//Create instance of http server class & start listening to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});