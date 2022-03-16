// IMPORTS
const experss = require('express');
const http = require('http');
const mongoose = require('mongoose');

// Create a server
const app = experss();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

// connect to mongodb
const DB = 'your db';

mongoose.connect(DB).then(() => {
    console.log('Connection Successful!');
}).catch((err) => {
    console.log(err);
});

// listen to server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started and running on port ${port}`);
});