// SignupPage.js
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignupPage() {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
    role: '', // You can uncomment this once you have the role input in your form
    // projectAssigned: false, // You can uncomment this once you have the projectAssigned input in your form
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/User/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Signup successful, handle the response here if needed
        const data = await response.json();
        toast.success("Account Created Succesfully") 
        toast.info("Please verify your email first")
        navigate('/');
        

      } else {
        // Signup failed, handle errors here
        const data = await response.json();
        toast.error("Invalid Details")
        console.error('Signup failed:', data);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <BackgroundVideo/>
      <ToastContainer/>
      <div className="form-popup">
        <div className="form-box">
            <div className="form-details">
                <h2>Join Us</h2>
                <p>Please Signup</p>
            </div>
            <div className="form-content">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="text"  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange} required/>
                       <label htmlFor="firstName">Firstname</label>
                    </div>
                    <div className="input-field">
                        <input type="text"  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}  required/>
                         <label htmlFor="lastName">Lastname</label>
                    </div>
                    <div className="input-field">
                        <input type="email"   
                  name="email"
                  value={formData.email}
                  onChange={handleChange} required/>
                         <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password"
                  value={formData.password}
                  onChange={handleChange} required/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange} required/>
                         <label htmlFor="cpassword">Confirm Password</label>
                    </div>
                    {/* <div className="input-field">
                    <input type="text" name="role" value={formData.role} 
                    onChange={handleChange} required/>
                        <label htmlFor="role">Role</label>
                  {/* <select value={role} onChange={handleRoleChange} required className="input-field"> */}
                  {/* <option value="" className='input-field' >Select Role</option>
                  <option value="team member" className='input-field'>Team Member</option>
                  <option value="project manager" className='input-field'>Project Manager</option>
                </select> */} 
              {/* </div> */}

              <div className="radio-field">
                <p>Role:</p>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Project Manager"
                    onChange={handleChange}
                    required
                  />
                  Project Manager
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Team Member"
                    onChange={handleChange}
                    required
                  />
                  Team Member
                </label>
              </div>



              {/* <div className="input-field">
  <label htmlFor="">Project Assigned</label>
  <select value={projectAssigned ? 'yes' : 'no'} onChange={handleProjectAssignedChange} required>
    <option value="no">No</option>
    <option value="yes">Yes</option>
  </select>
</div>

{projectAssigned === 'yes' && (
  <div className="input-field">
    <input type="text" required />
     <label htmlFor="">Project Title</label> 
  </div>
)} */}
                    <button type="submit">Signup</button>
                    <div className="bottom-link">
                        Already have an account?
                        <Link to="/" className='signup-link'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
