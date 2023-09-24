import React, {useState, useEffect} from 'react'
import ProjectDetails from './ProjectDetails';
import NewProjectForm from './NewProjectForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Project = () => {
  const [projects, setProjects] = useState([]);
let navigate = useNavigate()
  useEffect(() => {
    // Fetch all projects
    fetch('http://localhost:5000/api/Project/getprojects', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);
   // Function to handle logout
   const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='bg-main'>
      <h2>View Your Projects <button onClick={handleLogout} className='btn btn-primary'>Logout</button></h2>
      <Link to="/newproject" className='newproject'>Create Project</Link>
      {/* <NewProjectForm /> */}
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul>     
          {projects.map((project) => (
            <li key={project._id}>
             <ProjectDetails project={project} />
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}

export default Project
