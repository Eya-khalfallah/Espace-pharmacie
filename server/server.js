// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corpsOptions.js');
const errorHandler = require('./middleware/errorHandler.js');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn.js');

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

app.use('/auth', require('./routes/auth.js'));
app.use('/refresh', require('./routes/refresh.js'));
app.use('/logout', require('./routes/logout.js'));

app.use(verifyJWT);
app.use('/register', require('./routes/register.js'));
app.use('/users', require('./routes/api/users.js'));
app.use('/adherents', require('./routes/api/adherents.js'));

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});