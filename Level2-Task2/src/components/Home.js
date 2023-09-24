import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import { Container, Title, Filters, FilterDropdown } from './HomeStyles'; 
import {ThemeProvider} from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [selectedLocation, setSelectedLocation] = useState(''); 


  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, selectedLocation]); 

  async function fetchJobs() {
    try {
      let apiUrl = 'http://localhost:5000/api/jobs/';
      if (selectedCategory && selectedLocation) {
        apiUrl += `category/${selectedCategory}/location/${selectedLocation}`;
      } 
      else if (selectedCategory) {
        apiUrl += `category/${selectedCategory}`;
      }
      else if (selectedLocation) {
        apiUrl += `location/${selectedLocation}`;
      }

      const response = await fetch(apiUrl, {
        method:'GET',
        headers: {
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token')
        }
    });
      if (!response.ok) {
        throw new Error('No Job Found');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = event => {
    setSelectedLocation(event.target.value);
  };
  let navigate = useNavigate()
  useEffect(() => {
if(localStorage.getItem('token')){
  fetchJobs()
}
else{
  navigate('/login');
}
  })

  return (
   
    <Container>
      <Title>Job Listings</Title>
     
      <Filters>
        <FilterDropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Programming">Programming</option>
          <option value="UI/UX">UI/UX</option>
          <option value="SQA">SQA</option>
          <option value="Data Analyst">Data Analyst</option>
        </FilterDropdown>
        <FilterDropdown
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </FilterDropdown>
      </Filters>
      <JobList jobs={jobs} />
    </Container>
   
  );
};

export default Home;
