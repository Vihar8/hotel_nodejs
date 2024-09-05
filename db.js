const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//setup mongodb connection
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB'); 
});

db.on('error', (err) => {
    console.log('MongoDB connection error');  
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});  