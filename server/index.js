// IMPORTS
const { count } = require('console');
const experss = require('express');
const http = require('http');
const mongoose = require('mongoose');
const getSentence = require('./api/getSentence');
const Game = require('./models/Game');

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

    socket.on('create-game', async ({nickname}) => {
        try {
            let game = new Game();
            const sentence = await getSentence();
            game.words = sentence;
            let player = {
                socketID: socket.id,
                nickname: nickname,
                isPartyLeader: true,
            };
            game.players.push(player);
            game = await game.save();

            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updateGame', game);
        } catch(err) {
            console.log(err);
        }
    });

    socket.on('join-game', async ({nickname, gameID}) => {
        try {
            if (!gameID.match(/^[0-9a-fA-F]{24}$/)) {
                socket.emit('notCorrectGame', 'Please enter a valid game ID');
                return;
            }

            let game = await Game.findById(gameID);
            if (game.isJoin) {
                const id = game._id.toString();
                let player = {
                    nickname,
                    socketID: socket.id,
                };
                socket.join(id);
                game.players.push(player);
                game = await game.save();
                io.to(gameID).emit('updateGame', game);
            } else {
                socket.emit('notCorrectGame', 'The game is in progress, please try again later!');
            }
        } catch(err) {
            console.log(err);
        }
    });

    socket.on('userInput', async ({userInput, gameID}) => {
        let game = await Game.findById(gameID);
        if (!game.isJoin && !game.isOver) {
            let player = game.players.find(
                (playerr) => playerr.socketID === socket.id
            );
            if (game.words[player.currentWordIndex] === userInput.trim()) {
                player.currentWordIndex = player.currentWordIndex + 1;
                if (player.currentWordIndex !== game.words.length) {
                    game = await game.save();
                    io.to(gameID).emit('updateGame', game);
                }
            }
        }
    });

    // timer listener
    socket.on('timer', async ({playerId, gameID}) => {
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerId);

        if (player.isPartyLeader) {
            let timerId = setInterval(async () => {
                if (countDown >= 0) {
                    io.to(gameID).emit('timer', {
                        countDown,
                        msg: 'Game Starting',
                    });
                    console.log(countDown);
                    countDown--;
                } else {
                    console.log('game START!');
                    game.isJoin = false;
                    game = await game.save();
                    io.to(gameID).emit('updateGame', game);
                    startGameClock(gameID);
                    clearInterval(timerId);
                }
            }, 1000);
        }
    });
});

const startGameClock = async (gameID) => {
    let game = await Game.findById(gameID);
    game.startTime = new Date().gameTime();
    game = await game.save();

    let time = 120;

    let timerId = setInterval(
        (function gameIntervalFunc() {
            if (time >= 0) {
                const timeFormat = calculateTime(time);
                io.to(gameID).emit('timer', {
                    countDown: timeFormat,
                    msg: 'Time Remaining',
                });
                console.log(time);
                time--;
            }
            return gameIntervalFunc;
        })(), 
        1000
    );
};

const calculateTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

mongoose.connect(DB).then(() => {
    console.log('Connection Successful!');
}).catch((err) => {
    console.log(err);
});

// listen to server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started and running on port ${port}`);
});