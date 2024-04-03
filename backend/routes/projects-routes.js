const express = require('express');
// Assuming you have a Project model defined with Mongoose that you can import
const Project = require('../models/project-model');

const router = express.Router();

// Route to get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find(); // Find all projects in the database
    res.json(projects); // Send projects as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new project
router.post('/projects', async (req, res) => {
  const project = new Project({
    // Assuming your Project model has a title and description
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a project by ID
router.put('/projects/:id', async (req, res) => {
  // Logic to update a project identified by req.params.id
  // with new data found in req.body
});

// Route to delete a project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
    await project.remove();
    res.json({ message: 'Deleted Project' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
