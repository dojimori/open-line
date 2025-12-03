import express, { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './modules/auth/auth.route'
import userRoute from './modules/users/user.route'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import { initializeSocketHandlers } from "./sockets"

const app = express();
const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
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


initializeSocketHandlers(io);


server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});