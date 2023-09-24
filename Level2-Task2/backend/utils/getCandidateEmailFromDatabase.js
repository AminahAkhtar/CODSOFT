const Candidate = require('../models/Candidate'); // Import your Candidate model

// Function to fetch candidate's email using userId
async function getCandidateEmailFromDatabase(userId) {
  try {
    // Fetch the candidate document based on the userId
    const candidate = await Candidate.findById(userId);
    
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    
    return candidate.email;
  } catch (error) {
    throw error;
  }
}

module.exports = getCandidateEmailFromDatabase;
