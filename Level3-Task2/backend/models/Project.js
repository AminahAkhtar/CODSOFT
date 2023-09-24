const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  projectCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateOfCreation: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
    maxlength: 255, // Limit the title length
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000, // Limit the description length
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    // required: true,
  }],
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: {
        type: String,
        enum: ['Manager', 'Team Member'], // Validate role against a predefined set
        required: true,
      },
    },
  ],
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation: Ensure the deadline is in the future
        return value >= new Date();
      },
      message: 'Deadline must be a future date',
    },
  },
  files: [
    {
      filename: String,
      contentType: String,
      size: Number,
      uploadDate: Date,
      fileId: mongoose.Schema.Types.ObjectId,
    },
  ],
  projectPhases: [
    {
      phaseTitle: {
        type: String,
        required: true,
        trim: true,
      },
      phaseNumber: {
        type: String,
        required: true,
        trim: true,
      },
      phaseStatus: {
        type: String,
        default: 'Pending',
        required: true,
        enum: ['Pending', 'In Progress', 'Completed'], // Validate against predefined statuses
      },
    },
  ],
  phasePercentage: {
    type: Number, // Assuming this should be a number for percentage
    required: true,
    min: 0, // Ensure it's not negative
    max: 100, // Ensure it's not greater than 100
  },
  progressBar: {
    type: Number, // Assuming this should be a number for progress
    required: true,
    min: 0,
    max: 100,
  },
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
