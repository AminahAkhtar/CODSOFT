import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { JobCard } from './JobStyles';
const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [selectedOption, setSelectedOption] = useState('candidate');
  const navigate = useNavigate();

  const handleSubmitCandidate = async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/candidate/login", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json =  await response.json()
            console.log(json);
            if(json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('user-type', 'candidate');
                toast.success('Successfully Logged In');
                // props.showAlert("Successfully Logged In", "success")
                navigate("/");
            }
            else{
              toast.error("Invalid Credentials");
            }
        }
    

        const handleSubmitEmployer = async (e) => {
          e.preventDefault();
          const response = await fetch("http://localhost:5000/api/employer/login", {
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json =  await response.json()
          console.log(json);
          if(json.success){
              // Save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              localStorage.setItem('user-type', 'employer');
              toast.success('Successfully Logged In');
              // props.showAlert("Successfully Logged In", "success")
              navigate("/employerDashboard");
          }
          else{
            toast.error("Invalid Credentials");
          }
      }
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="mb-3 login-type my-3">
      <JobCard className='bg-dark' style={{color: 'white'}}>Select Login Type:
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
          <div>
           
               <form className='container my-5' onSubmit={handleSubmitCandidate}>
               <h3>Candidate Login</h3>
               <div className="mb-3">
                 <label htmlFor="email" className="form-label">Email address</label>
                 <input type="email" className="form-control" value={credentials.email}  onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
               </div>
               <div className="mb-3">
                 <label htmlFor="password" className="form-label" >Password</label>
                 <input type="password" className="form-control"value={credentials.password} onChange={onChange} id="password" name="password"/>
               </div>
               <button type="submit" className="btn btn-primary" >Submit</button>
             </form>
             </div>
      ) : (
        <div>
             <form className='container my-5' onSubmit={handleSubmitEmployer}>
              <h3>Employer Login</h3>
             <div className="mb-3">
               <label htmlFor="email" className="form-label">Email address</label>
               <input type="email" className="form-control" value={credentials.email}  onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
             </div>
            <div className="mb-3">
               <label htmlFor="password" className="form-label" >Password</label>
              <input type="password" className="form-control"value={credentials.password} onChange={onChange} id="password" name="password"/>
             </div>
             <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
           </div>
      )}
    </div>
  );
};

export default Login;

