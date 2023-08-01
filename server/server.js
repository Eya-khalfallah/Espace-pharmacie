import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import connectDB from "./config/dbConn.js";

const PORT = process.eventNames.PORT || 3500 ;

//Connect to MongoDB

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});