import express, { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import { getAuthed } from "./utils/user"

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(morgan('dev'))
app.use(
  cors({ 
    origin: "http://localhost:5173",
    credentials: true
  })
)
app.use(express.json())
app.use(session({
  secret: "secrethehehe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,          // if frontend is https
  }
}))
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);


const users = new Map();


// app.get('/api/users', async(req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users)
//   } catch(error) {
//     console.log(error)
//   }
// })


// Socket Events
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat:message', (data) => {
    io.emit('chat:message', {
      message: data.message,
      time: data.time,
      user: users.get(socket.id)
    });
    // const user = users.get(socket.id);
    // console.log(`received: from ${user}`, data)
  });


  /*
    add joined users to the map  
    so we can track them
  */
  socket.on('join', (data) => {
    // console.log(`${username} joined.`)
    users.set(socket.id, { username: data.username , id: data.id });
    io.emit('joined', `${data.username} joined the chat`)
  })

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      io.emit('left', `${user.username} left the chat`)
      users.delete(socket.id)

    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })

  socket.on('stop_typing', (data) => {
    socket.broadcast.emit('stop_typing');
  })

  socket.on('left', () => {
    const user = users.get(socket.id);
    if (user) {
      io.emit('left', `${user.username} left the chat`)
      users.delete(socket.id)
    }
  });


});

server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});