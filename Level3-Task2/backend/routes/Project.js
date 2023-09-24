const express = require('express');
const router = express.Router();
const projectController = require('../controllers/Project');
const fetchuser = require('../middleware/fetchuser')
const { body} = require('express-validator');
const { validationResult } = require('express-validator');
// Create a new project
router.post(
    '/createprojects',
    [
      // Validation rules for request body fields
      body('title').trim().not().isEmpty().withMessage('Project title is required'),
      body('description').trim().not().isEmpty().withMessage('Project description is required'),
      body('deadline')
        .isISO8601()
        .custom((value, { req }) => {
          // Custom validation: Check if the deadline is not a previous date
          const currentDate = new Date();
          const projectDeadline = new Date(value);
          if (projectDeadline < currentDate) {
            throw new Error('Deadline cannot be a previous date');
          }
          return true;
        })
        .withMessage('Invalid deadline format or a previous date'),
      // Add more validation rules for other project fields as needed
    ],
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // If validation passes, call the controller function
      projectController.createProject(req, res);
    }
  );

// Get a list of projects
router.get('/getprojects', fetchuser, projectController.getProjects);

// Get a project by ID
router.get('/projects/:projectId', fetchuser, projectController.getProjectById);

// Update project information
router.put('/projects/:projectId', fetchuser, projectController.updateProject);

// Delete a project
router.delete('/projects/:projectId', fetchuser, projectController.deleteProject);

module.exports = router;
