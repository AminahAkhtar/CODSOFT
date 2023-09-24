// controllers/projectController.js
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
// Create a new project
async function createProject(req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // If validation passes, create the project
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get a list of projects
async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a project by ID
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update project information
async function updateProject(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
    if (!updatedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a project
async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
    if (!deletedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
