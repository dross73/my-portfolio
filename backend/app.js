// Importing the necessary modules.
const express = require('express'); // Express framework for creating the server

const projectRoutes = require('./routes/projects-routes');

const userRoutes = require('./routes/users-routes');


const { MongoClient } = require('mongodb'); // MongoDB client for database operations
require('dotenv').config(); // Dotenv for loading environment variables from .env file

// Create an instance of express which will be our server
const app = express();


app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Define the port number as specified in environment variables or default to 3000
const port = process.env.PORT || 3000;

// Retrieve the MongoDB URI from the environment variables
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance with the MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// An asynchronous function to connect to the database
async function run() {
  try {
    // Attempt to connect to the MongoDB database
    await client.connect();
    console.log('Connected to the database');

    // Database operations can be handled here

  } catch (e) {
    // If an error occurs, log the error
    console.error('Unable to connect to the database', e);
  }
  // The client will remain connected throughout the lifetime of the application
  // You can also handle client.close() if needed
}

// Call the run function to connect to the database
run();

// Define a basic route to ensure our server is working
app.get('/', (req, res) => {
  res.send('Hello World! The server is up and running.');
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
