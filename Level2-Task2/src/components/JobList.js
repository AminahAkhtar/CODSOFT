import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {JobCard, Title, Info, Description, ApplyButton} from './JobStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase, faCode, faBuilding, faDatabase, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import './JobList.css'
import { useNavigate } from 'react-router-dom';
const JobList = ({ jobs }) => {
  let navigate = useNavigate();
  // const handleApply = (e) => {
  //    navigate('/apply')
  // }
    return (
        <div>
    
    {jobs.length === 0 ? (
        <JobCard>No jobs found.</JobCard>
      ) : (
  <ul>
    
    {jobs.map((job) => (
      <JobCard key={job._id}>
        <Title>{job.title}</Title>
        <Description>Description: {job.description}</Description>
        <Info><FontAwesomeIcon icon={faBuilding} className="icon"  /> Company: {job.company}</Info>
        <Info> <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />Location: 
                  {job.location}</Info>
        <Info> <FontAwesomeIcon icon={faBriefcase} className="icon" />Job Type:
                  {job.jobType}</Info>
        <Info><FontAwesomeIcon icon={faDatabase} className="icon"  /> Category: {job.category}</Info>
        <Info><FontAwesomeIcon icon={faCode} className="icon"  />Skills: {job.skillsRequired.join(', ')}</Info>
        <Info><FontAwesomeIcon icon={faMoneyBill1Wave} className="icon"  />Salary: {job.salary}</Info>
        <Link to={`/apply/${job._id}`} key={job._id}>Apply Now</Link>
        {/* <ApplyButton><Link
        to={{
          pathname: '/apply',
          state: {
            job: job._id, // Replace with the actual job ID from your data
            candidateEmail: 'candidate-email@example.com', // Replace with the logged-in candidate's email
          },
        }}
      >
        Apply Now
      </Link></ApplyButton> */}
      </JobCard>
    ))}
  </ul>
      )}
      </div>
 );
};

export default JobList;
