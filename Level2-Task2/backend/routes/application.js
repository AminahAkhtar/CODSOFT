const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const upload = require('../middleware/multer');
const Application = require('../models/Application');
const Job = require('../models/Job');
const {body, validationResult} = require('express-validator')
//apply for a job GET
router.post('/apply', upload.single('resume'), fetchuser,  [
  body('name', 'Enter a valid name').isLength({min:3}),
  body('email', 'Enter a valid email').isEmail(),
  body('phoneNumber','number should be 11 digits').isLength({min:11}), 
],async (req, res) => {

    // if there are errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    try {
      const { name, email, phoneNumber, highestDegree, cgpa, job, candidateEmail } = req.body;
      const { filename } = req.file;
  
      // Check if the job exists
      const jobs = await Job.findById(job);
      console.log(jobs)
      if (!jobs) {
        return res.status(404).json({message: 'Job not found' });
      }
      const candidate = await Candidate.findOne({ email: candidateEmail });
      if (!candidate) {
        return res.status(404).json({message: 'Candidate not found' });
      }
  
      // Create a new application
      const application = new Application({
        name: name,
        email:email,
        phoneNumber: phoneNumber,
        highestDegree: highestDegree,
        cgpa: cgpa,
        job: job,
        candidateEmail: candidate.email,
        resume: filename,
        // status: "pending",
      });
  
      const savedApplication = await application.save();
  
      res.status(201).json(savedApplication);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Server Error' });
    }
  });
  
  // Get applications submitted by a user
router.get('/candidate/:candidateEmail', fetchuser, async (req, res) => {
    try {
      const candidateEmail= req.params.candidateEmail;
  console.log(candidateEmail)
      // Retrieve applications submitted by the user
      const applications = await Application.find({ candidateEmail: candidateEmail }).populate('job');
  console.log(applications)
      res.json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Get applications submitted for a job (employer view)
  router.get('/job/:jobId', async (req, res) => {
    try {
      const jobId = req.params.jobId;
  
      // Retrieve applications submitted for the job
      const applications = await Application.find({ job: jobId }).populate('candidateEmail');
  
      res.json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports =  router
