// IMPORTS
const experss = require('express');
const http = require('http');
const mongoose = require('mongoose');

// Create a server
const app = experss();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

// listen to server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started and running on port ${port}`);
});