// Import necessary modules

const express = require ("express"); // Import Express framework
var cors = require('cors') // Import CORS middleware to enable cross-origin requests
const app = express(); // Create an instance of Express
const db = require('./db'); 
const Passport = require('passport');// Import your database configuration (make sure this file exists and is correctly set up)
require('dotenv').config();
const passport = require('./auth'); // Ensure this path is correct



// Middleware to handle CORS
app.use(cors()) // Allow all origins by default

// Middleware to parse JSON data in the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body me store karega data // This will parse JSON payloads in incoming requests and make it available in req.body

const PORT = process.env.PORT || 3000;

// middle ware function
const logRequest = (req, res, next) => {
	console.log(`${new Date ().toLocaleString()} Request Made to: ${req.originalUrl}`);
	next(); // move to next phase

}


// Additional CORS configuration
app.use(
	cors({
		origin:"https://vimo-restaurant.vercel.app", // Allow requests from this origin (adjust the URL as per your frontend)
		credentials:true, // Allow credentials (cookies, authorization headers) to be included in requests
	})
)
app.use(logRequest);

app.use(Passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res) {
    res.send('Welcome to my Restaurant'); // Add a response to the client
});

// routes files import
const personRoutes = require('./routes/personRoutes'); // Import routes related to 'person' (ensure the file exists)
const menuItemRoutes = require('./routes/menuRoutes'); // Import routes related to 'menu' (ensure the file exists)


// Register the imported routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`server is on 3000`);
        
})