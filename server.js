import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { connectDB } from './utils/connectDB.js';
import { userRouter } from './routers/userRouter.js';
import { protect } from './middlewares/protectRoutes.js';

// connect to db
connectDB();

const app = express();
const server = createServer(app);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// set up routes
app.use('/auth', userRouter);
app.use(protect);

app.get('/test', (req, res) => {
  console.log(req.userId);
  res.send('Its work!!');
});


const io = new Server(server, { cors: { origin: ['http://localhost:3000'] } });

// run when client connects
io.on('connection', (socket) => {
  console.log(socket.id)
  // welcome curent user
  socket.emit('message', {
    sender: 'boot',
    message: `Welcome user ${ socket.id}`
  });
  
  // broadcast when a user connect
  socket.broadcast.emit('message', {
    sender: 'boot',
    message: `${socket.id} has joined to chat..`
  });

  // runs when client disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', {
      sender: 'boot',
      message: `A user has left the chat..`
    });
    console.log('user disconnected');
  });

  // listen for messages from client
  socket.on('message', (obj) => io.emit('message', obj));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));