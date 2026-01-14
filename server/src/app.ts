import express, { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'

/* routes */
import authRoute from './modules/auth/auth.route'
import usersRoute from './modules/users/users.route'
import chatsRoute from './modules/chats/chats.route'
/* end routes */

import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import { initializeSocketHandlers } from "./sockets"
import path from "path"
import { errorHandler } from "./middleware/error.middleware"
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
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: "secrethehehe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,          // if frontend is https
  }
}))

const root = process.cwd();

app.use('/uploads', express.static(path.join(root, 'uploads')))
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/chats', chatsRoute);
app.use(errorHandler)

initializeSocketHandlers(io);
server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});

