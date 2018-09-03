const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../public')));

const io = socketIO(server);

io.on("connection", (socket) => {

    socket.emit('userConnected', {
        from: 'admin',
        text: 'Welcome to the chat app'
    });
    socket.broadcast.emit('userConnected', {
        from: 'admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    // socket.on('createEmail', (message) => {
    //     console.log('createEmail ', message);

    //     socket.broadcast.emit('newMessage', {
    //         from: message.from,
    //         to: message.to,
    //         text: message.text,
    //         createdAt: new Date().getTime
    //     });
    // });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});