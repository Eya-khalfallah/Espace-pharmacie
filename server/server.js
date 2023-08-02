// server.js
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";
import usersRouter from './routes/api/users.js';
import ordonnancesRouter from './routes/api/ordonnances.js';
import registerRouter from './routes/register.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
import path from "path";
import cors from "cors";
import corsOptions from "./config/corpsOptions.js";
import errorHandler from "./middleware/errorHandler.js";
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

const PORT = process.eventNames.PORT || 3500 ;

connectDB();

// Handle options credentials check - before CORS !
// and fetsh cookies credentials requirement
app.use(credentials);

//Cross Origin Resources Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/register', registerRouter);

app.use(verifyJWT);
app.use('/users', usersRouter);
app.use('/ordonnances', ordonnancesRouter);

//serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});