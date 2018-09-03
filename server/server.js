const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../public')));

const io = socketIO(server);

io.on("connection", (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});