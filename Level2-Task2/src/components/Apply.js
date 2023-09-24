import React, { useState, useEffect } from 'react';
import ApplyForm from './ApplyForm';
import { useNavigate, useParams } from 'react-router-dom';
const Apply = () => {
  const { jobId } = useParams();
  console.log("Job ID:", jobId);
  const [candidateEmail, setCandidateEmail] = useState('');

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
      console.log(data);
      return data.email;
    } 
    catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    fetchCandidateEmail(authToken)
      .then((email) => setCandidateEmail(email))
      .catch((error) => console.error(error));
  }, []);
  let navigate = useNavigate()
  if(localStorage.getItem('token')){
    return <ApplyForm jobId={jobId} candidateEmail={candidateEmail} />;
  }
  else{
    navigate('/login');
  }
  

  return (<>
  
  <ApplyForm jobId={jobId} candidateEmail={candidateEmail}/>
  </>
   
  );
};

export default Apply;
