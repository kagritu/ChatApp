const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
//we could create server through express, but we want to use it directly
const server = http.createServer(app);
const io = socketio(server);


//to set static folder, so that we can use our front end part
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatApp Bot';

//run when client connects
io.on('connection', socket => {
    //now this will emit the message
    //this message is shown to the single user thats connecting
    socket.emit('message', formatMessage(botName, 'Welcome to ChatApp!'));

    //broadcast when a user connects
    //this message will shown to everyone except the client that joined the chat
    socket.broadcast.emit('message', formatMessage(botName,  'A user has joined the chat'));

    //Runs when client disconnects
    socket.on('disconnect', () =>{
        //io.emit as to show this message to everyone
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

    //listen for chatMessage
    socket.on('chatMessage', msg => {
        //we want to emit it to everybody, instead of console
        io.emit('message', formatMessage('USER', msg));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));