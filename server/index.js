// IMPORTS
const experss = require('express');
const http = require('http');
const mongoose = require('mongoose');

// Create a server
const app = experss();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require('socket.io')(server);

// connect to mongodb
const DB = 'your db';

// listening to socket io events from the client (flutter code)
io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('test', (data) => {
        console.log(data);
    });
});

mongoose.connect(DB).then(() => {
    console.log('Connection Successful!');
}).catch((err) => {
    console.log(err);
});

// listen to server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started and running on port ${port}`);
});