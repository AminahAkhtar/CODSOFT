import React, {useState, useEffect} from 'react'
import {BrowserRouter, useNavigate} from 'react-router-dom'
import {JobCard, Title, Info, Description} from './JobStyles'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const EmployerDashboard = () => {

const navigate = useNavigate();
const [jobs, setJobs] = useState([]);
const [applications, setApplications] = useState([]);
const [selectedJobId, setSelectedJobId] = useState(null);




useEffect(() => {
  
  fetch('http://localhost:5000/api/employer/employerDashboard/jobs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setJobs(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

useEffect(() => {
 
  if (selectedJobId) {
    fetch(`http://localhost:5000/api/application/job/${selectedJobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [selectedJobId]);

const handleViewApplications = (jobId) => {
  setSelectedJobId(jobId);
};

const handleHideApplications = () => {
  setSelectedJobId(null);
  
  setApplications([]);
};

return (
  <div className="container">
    <JobCard>
      Employer Dashboard
      <Link  to="/postJob" className="btn btn-primary mx-5">Post A New Job</Link>
    </JobCard>
    <div>
      {jobs.length === 0 ? (
        <JobCard>No jobs posted yet.</JobCard>
      ) : (
        <ul>
          {jobs.map((job) => (
            <JobCard key={job._id}>
              <Title>{job.title}</Title>
              <Description>Description: {job.description}</Description>
              <Info> Company: {job.company}</Info>
              <Info> Location: {job.location}</Info>
              <Info> Job Type: {job.jobType}</Info>
              <Info>Category: {job.category}</Info>
              <Info>Skills: {job.skillsRequired.join(', ')}</Info>
              <Info>Salary: {job.salary}</Info>
              <button
                className="btn btn-primary"
                onClick={() => handleViewApplications(job._id)}
              >
                View Received Applications
              </button>
              {selectedJobId === job._id && (
                <div>
                  {applications.length === 0 ? (
                    <JobCard>No applications received yet.</JobCard>
                  ) : (
                    <ul>
                      {applications.map((application) => (
                        <JobCard key={application._id}>
                          <Info>Name: {application.name}</Info>
                          <Info>Email: {application.email}</Info>
                          <Info>Phone Number: {application.phoneNumber}</Info>
                          <Info>Highest Degree: {application.highestDegree}</Info>
                          <Info>CGPA: {application.cgpa}</Info>
                          <div>
        <a
          href={`http://localhost:5000/api/resumes/${application.resume}`} 
          target="_blank" 
          download 
          className="btn btn-primary"
        >
          Download Resume
        </a>
      </div>
                        </JobCard>
                      ))}
                       <button
                            className="btn btn-primary"
                            onClick={handleHideApplications}
                          >
                            Hide Applications
                          </button>
                    </ul>
                  )}
                </div>
              )}
            </JobCard>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};


export default EmployerDashboard
