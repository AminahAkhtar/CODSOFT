import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobCard } from './JobStyles';
const Signup = () => {
    const [credentials, setCredentials] = useState({name: "", email:"", password:"", cpassword:""})
    const [selectedOption, setSelectedOption] = useState('candidate');
    let navigate = useNavigate();
    
    const handleSubmitCandidateSignup = async (e) => {
        e.preventDefault();
        // const  [name,email,password] = credentials;
        const response = await fetch("http://localhost:5000/api/candidate/createuser", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(credentials)
        });
        const json =  await response.json()
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            toast.success('Account Created Successfully');
            // props.showAlert("Account Created Successfully", "success")
            navigate("/login");
        }
        else{
          toast.error("Invalid Credentials");
            // props.showAlert("Invalid Credentials", "danger")
        }
    }

    const handleSubmitEmployerSignup = async (e) => {
      e.preventDefault();
      // const  [name,email,password] = credentials;
      const response = await fetch("http://localhost:5000/api/employer/createuser", {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify(credentials)
      });
      const json =  await response.json()
      console.log(json);
      if(json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          toast.success('Account Created Successfully');
          // props.showAlert("Account Created Successfully", "success")
          navigate("/login");
      }
      else{
        toast.error("Invalid Credentials");
          // props.showAlert("Invalid Credentials", "danger")
      }
  }
    const onChange =(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
     }
  return (
    <div>
    <div className="mb-3 login-type my-3">
    <JobCard className='bg-dark' style={{color: 'white'}}>Select Signup Type:
      <div className="custom-radio">
        <JobCard className='mx-5 bg-dark' style={{color: 'white'}}>
          <input className='mx-2'
            type="radio"
            name="loginType"
            value="candidate"
            checked={selectedOption === 'candidate'}
            onChange={() => setSelectedOption('candidate')}
          />
          <span className="radio-label">Candidate</span>
        </JobCard>
        <JobCard  className='mx-5 bg-dark' style={{color: 'white'}}>
          <input className='mx-2'
            type="radio"
            name="loginType"
            value="employer"
            checked={selectedOption === 'employer'}
            onChange={() => setSelectedOption('employer')}
          />
          <span className="radio-label">Employer</span>
        </JobCard>
       
      </div>
      </JobCard>
    </div>


    {selectedOption === 'candidate' ? (
    <div className='container my-5'>
     <form onSubmit={handleSubmitCandidateSignup}>
     <h3>Candidate Signup</h3>
     <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange}aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
    </div>
     ) : (

      <div className='container my-5'>
      <form onSubmit={handleSubmitEmployerSignup}>
      <h3>Employer Signup</h3>
      <div className="mb-3">
     <label htmlFor="name" className="form-label">Name</label>
     <input type="text" className="form-control" id="name"name="name" onChange={onChange} aria-describedby="emailHelp"/>
   </div>
   <div className="mb-3">
     <label htmlFor="email" className="form-label">Email address</label>
     <input type="email" className="form-control" id="email" name="email" onChange={onChange}aria-describedby="emailHelp"/>
   </div>
   <div className="mb-3">
     <label htmlFor="password" className="form-label">Password</label>
     <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange}/>
   </div>
   <div className="mb-3">
     <label htmlFor="cpassword" className="form-label">Confirm Password</label>
     <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} aria-describedby="emailHelp"/>
   </div>
   <button type="submit" className="btn btn-primary">Submit</button>
 </form> 
     </div>
 )}
    </div>
  );
};

export default Signup
