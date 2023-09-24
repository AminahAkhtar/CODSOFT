// controllers/taskController.js
const Task = require('../models/Task');
const { validationResult } = require('express-validator');
// Create a new task with input validation
async function createTask(req, res) {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get a list of tasks
async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a task by ID
async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update task information
async function updateTask(req, res) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a task
async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
