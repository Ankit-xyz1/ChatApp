import express from 'express'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from './src/routes/auth.route.js'
import messageRoute from './src/routes/message.route.js'
import { connectDb } from "./src/lib/db.js";
import cors from 'cors'
import { app , server } from './src/lib/socket.js';
import path from 'path'


dotenv.config();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"https://caht-app-backend.vercel.app/",
}))

const __dirname = path.resolve();

// routes
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Chat App API' });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "dist", "index.html"));
  });
}

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});
