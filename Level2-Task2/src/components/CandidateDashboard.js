import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {JobCard} from './JobStyles'


const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState('');

  useEffect(() => {
    // Function to fetch the candidate's email
    const fetchCandidateEmail = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/candidate/getEmail', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidate email');
        }

        const data = await response.json();
        setCandidateEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch applications for the candidate using their email
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/application/candidate/${candidateEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCandidateEmail();
    fetchApplications();
  }, [candidateEmail]);

  return (
    <div className="container my-5">
      <h2>View Your Submitted Applications</h2>
      <p>Candidate Email: {candidateEmail}</p>
      <ul  className='mx-15'>
        {applications.map((application) => (
          <JobCard key={application._id}>
            <p>Name: {application.name}</p>
            <p>Email: {application.email}</p>
            <p>Job Title: {application.job.title}</p>
            <p>Job Desc: {application.job.description}</p>
            <p>Job Company: {application.job.company}</p>
            <p>Job Location: {application.job.location}</p>
            {/* <Info>Phone Number: {application.phoneNumber}</Info>
            <Info>Highest Degree: {application.highestDegree}</Info>
            <Info>CGPA: {application.cgpa}</Info> */}
          </JobCard>
        ))}
      </ul>
    </div>
  );
};


export default CandidateDashboard
