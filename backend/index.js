import express from 'express'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from './src/routes/auth.route.js'
import messageRoute from './src/routes/message.route.js'
import { connectDb } from "./src/lib/db.js";


const app = express();
dotenv.config();
const port = process.env.PORT;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Chat App API' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});