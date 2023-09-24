// LoginPage.js
import React, {useState} from 'react';
import BackgroundVideo from './BackgroundVideo';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  
function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return JSON.parse(rawData);
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

    // Handle successful login
    if (response.ok) {
      const data = await response.json();

      // Retrieve the user's role from the JWT token (if using role)
      const token = data.token;
      const userRole = decodeToken(token).role;

      // Store the token and user role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      // Redirect based on user's role
      if (userRole === 'Project Manager') {
        navigate('/projects'); // Redirect to projects
      } else if (userRole === 'Team Member') {
        navigate('/tasks'); // Redirect to tasks
      }
    }else {
        const errorData = await response.json();
        setError(errorData.error);
  
        // Display toast messages for different error scenarios
        if (errorData.error === 'Invalid credentials') {
          toast.error('Invalid credentials');
        } else if (errorData.error === 'Email not verified') {
          toast.info('Please verify your email');
        } else {
          toast.error('Internal Server Error');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div>
      <BackgroundVideo />
      <ToastContainer />
      <div className="form-popup">
        <div className="form-box">
            <div className="form-details">
                <h2>Welcome Back</h2>
                <p>Please Login</p>
            </div>
            <div className="form-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                    <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                         <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                    <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Login</button>
                    <div className="bottom-link">
                        Don't have an account?
                        <Link to="/signup" className='signup-link'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

