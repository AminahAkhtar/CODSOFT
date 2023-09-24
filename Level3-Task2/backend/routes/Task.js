// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/Task');
const { body} = require('express-validator');
const Task = require('../models/Task')
// Create a new task with input validation
router.post(
  '/tasks',
  [
    // Validation rules for request body fields
    body('name').trim().not().isEmpty().withMessage('Task name is required'),
    body('description').trim().not().isEmpty().withMessage('Task description is required'),
    body('deadline')
      .isISO8601()
      .custom((value) => {
        // Custom validation: Ensure the deadline is a future date
        const currentDate = new Date();
        if (new Date(value) < currentDate) {
          throw new Error('Deadline must be a future date');
        }
        return true;
      })
      .withMessage('Invalid deadline format or a previous date'),
    // Add more validation rules for other task fields as needed
  ],
  taskController.createTask
);

// Get a list of tasks
router.get('/tasks', taskController.getTasks);

// Get a task by ID
router.get('/tasks/:taskId', taskController.getTaskById);

// Update task information with input validation
router.put(
  '/tasks/:taskId',
  [
    // Validation rules for request body fields (similar to create task)
    body('name').trim().not().isEmpty().withMessage('Task name is required'),
    body('description').trim().not().isEmpty().withMessage('Task description is required'),
    body('deadline')
      .isISO8601()
      .custom((value) => {
        // Custom validation: Ensure the deadline is a future date
        const currentDate = new Date();
        if (new Date(value) < currentDate) {
          throw new Error('Deadline must be a future date');
        }
        return true;
      })
      .withMessage('Invalid deadline format or a previous date'),
    // Add more validation rules for other task fields as needed
  ],
  taskController.updateTask
);

// Delete a task
router.delete('/tasks/:taskId', taskController.deleteTask);


//get tasks of a user
router.get('/userTasks', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.email }); // Assuming email is used for user identification
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
