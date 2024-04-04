const express = require('express');
// Import the Project model
const Project = require('../models/project-model');

const router = express.Router();

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); // Find project by ID
    if (!project) {
      return res.status(404).json({ message: 'Cannot find project.' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project
router.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description, // Create a new project
  });
  try {
    const newProject = await project.save(); // Save the project to the database
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a project by ID
router.put('/projects/:id', async (req, res) => {
  try {
    // Update project by ID. The { new: true } option returns the updated doc
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Cannot find project.' });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); // Find the project
    if (!project) {
      return res.status(404).json({ message: 'Cannot find project.' });
    }
    await project.remove(); // Remove the project from the database
    res.json({ message: 'Deleted Project' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
