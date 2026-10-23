require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 5012;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory active message store for rooms
const roomMessages = {};

io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('join_room', ({ username, room }) => {
    socket.join(room);
    socket.data = { username, room };

    // Send existing room history
    if (!roomMessages[room]) roomMessages[room] = [];
    socket.emit('room_history', roomMessages[room]);

    // Notify room members
    socket.to(room).emit('system_message', {
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('send_message', (data) => {
    const msg = {
      id: Date.now(),
      sender: data.username,
      text: data.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    if (roomMessages[data.room]) roomMessages[data.room].push(msg);
    io.to(data.room).emit('receive_message', msg);
  });

  socket.on('typing', ({ username, room }) => {
    socket.to(room).emit('user_typing', username);
  });

  socket.on('disconnect', () => {
    if (socket.data?.room) {
      socket.to(socket.data.room).emit('system_message', {
        text: `${socket.data.username} left the chat`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  });
});

server.listen(PORT, () => console.log(`⚛️ Practical 12 (Socket.IO Chat) running on http://localhost:${PORT}`));
