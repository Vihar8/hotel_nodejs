// Import necessary modules
const express = require ("express"); // Import Express framework
var cors = require('cors'); // Import CORS middleware to enable cross-origin requests
const app = express(); // Create an instance of Express
const db = require('./db'); // Import your database configuration
const Passport = require('passport'); // Import Passport for authentication
require('dotenv').config();
const passport = require('./auth'); // Ensure this path is correct

// Middleware to parse JSON data in the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // This will parse JSON payloads in incoming requests and make it available in req.body

const PORT = process.env.PORT || 3000;

// Middleware function for logging requests
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    next(); // Move to the next phase
}

// Set allowed origins for CORS
const allowedOrigins = ['http://localhost:4002', 'https://vimo-restaurant.vercel.app'];

// Additional CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // If origin isn't allowed, send an error
            return callback(new Error('Not allowed by CORS'));
        }
        // Allow the request
        return callback(null, true);
    },
    credentials: true, // Allow credentials (cookies, authorization headers) to be included in requests
}));

// Apply the logging middleware
app.use(logRequest);

// Initialize Passport for authentication
app.use(Passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Define a basic route
app.get('/', function (req, res) {
    res.send('Welcome to my Restaurant');
});

// Import routes files
const personRoutes = require('./routes/personRoutes'); // Ensure the file exists
const menuItemRoutes = require('./routes/menuRoutes'); // Ensure the file exists

// Register the imported routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
