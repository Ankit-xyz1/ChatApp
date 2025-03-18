import express from "express";
import { Server } from "socket.io";
import http from "http";
import { log } from "console";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getUserSocketId(userId) {
  console.log(onlineUsers[userId])
  return onlineUsers[userId];
};

const onlineUsers = {}; // { userId: socket.id }
const socketToUser = {}; // { socket.id: userId }

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  const userID = socket.handshake.query.userId;

  if (userID) {
    onlineUsers[userID] = socket.id;
    socketToUser[socket.id] = userID; // Store reverse mapping
  }

  // Emit updated online users list
  io.emit("onlineUsersNow", Object.values(socketToUser));
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);

    // Find userId from socketId
    const userId = socketToUser[socket.id];
  
    if (userId) {
      delete onlineUsers[userId]; // Remove user from onlineUsers
      delete socketToUser[socket.id]; // Remove socket mapping
    }

    // Emit updated online users list
    io.emit("onlineUsersNow", Object.values(socketToUser));
  });
});



export { app, server, io };
