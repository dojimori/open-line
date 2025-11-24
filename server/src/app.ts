import express,  { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(express.json())

const users = new Map();

// Socket Events
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat:message', (data) => {
    io.emit('chat:message', {
        message: data,
        username: users.get(socket.id)
    }); 
    const user = users.get(socket.id);
    console.log(`received: from ${user}`, data)
  });


  /*
    add joined users to the map  
    so we can track them
  */
  socket.on('join', (username) => {
    console.log(`${username} joined.`)
    users.set(socket.id, username);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});