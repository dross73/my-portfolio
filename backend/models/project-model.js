// Import the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Project model
// Schemas are like blueprints for documents in a MongoDB collection
const projectSchema = new mongoose.Schema({
  title: { // The title of the project
    type: String, // Specifies the data type as String
    required: true // Makes this field required; a project must have a title
  },
  description:{type: String, required: true}, // A brief description of the project; not required
  technologiesUsed: {type: [String], required: true}, // An array of strings listing technologies used in the project
  projectLink: String, // URL link to the project; not required
  imageUrls: {type: [String], required: true}, // An array of strings for image URLs related to the project
  date: { // The date when the project was added or last updated
    type: Date,
    default: Date.now // Automatically set to the current date and time
  }
});

// Export the Project model with the defined schema
// 'Project' is the name of the collection in MongoDB
// mongoose.model() creates a new model instance with the given name and schema
module.exports = mongoose.model('Project', projectSchema);
