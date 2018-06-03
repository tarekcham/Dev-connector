const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false})); //basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(bodyParser.json()); // basically tells the system that you want json to be used.


//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDb
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`))