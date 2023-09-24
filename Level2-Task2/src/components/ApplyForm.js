

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ApplyForm = ({ jobId, candidateEmail}) => {
  let navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    highestDegree: '',
    cgpa: '',
    resume: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const { name, email, phoneNumber, highestDegree, cgpa, resume } = formData;

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('highestDegree', highestDegree);
    data.append('cgpa', cgpa);
    data.append('resume', resume);
    data.append('job', jobId);
    data.append('candidateEmail', candidateEmail);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/application/apply",
        data, {
          // method:"POST",
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': localStorage.getItem('token'),
          },
        });
        
        toast.success('Application Submitted Successfully');
        navigate("/");
      
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='container my-5'>
      <h2>Apply Now</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"name="name" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email"name="email" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="phone number" className="form-label">Phone Number</label>
    <input type="text" className="form-control" id="phoneNumber"name="phoneNumber" onChange={handleChange} aria-describedby="emailHelp" minLength={11}/>
  </div>
  <div className="mb-3">
    <label htmlFor="highest degree" className="form-label">Highest Degree</label>
    <input type="text" className="form-control" id="highestDegree"name="highestDegree" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cgpa" className="form-label">CGPA</label>
    <input type="text" className="form-control" id="cgpa"name="cgpa" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
  <label htmlFor="name" className="form-label">Resume</label>
          <input type="file" className="form-control" name="resume" onChange={handleFileChange} />

     </div>   
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyForm;

