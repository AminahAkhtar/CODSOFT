import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Project.css'
import './NewProjectForm.css'
const NewProjectForm = () => {
  let navigate = useNavigate()
  const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        deadline:'',
        dateOfCreation:''
        // Include other project-related fields here
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
          ...projectData,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Send a POST request to create a new project with formData
        fetch('http://localhost:5000/api/Project/createprojects', {
          method: 'POST',
          headers: {
            'Content-type':"application/json",
        'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify(projectData),
        })
          .then((response) => {
            if (response.ok) {
              navigate('/projects')
              // Handle successful project creation, e.g., refresh the projects list
            } else {
              console.log("error")
              // Handle errors, e.g., show an error message
            }
          })
          .catch((error) => console.error('Error creating project:', error));
      };
    
      return (
        <div className='bg-main'>
        <h2>Create A New Project</h2>
          <form onSubmit={handleSubmit} className="new-project-form">
          <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfCreation">Date of Creation:</label>
          <input
            type="date"
            id="dateOfCreation"
            name="dateOfCreation"
            value={projectData.dateOfCreation}
            onChange={handleChange}
            required
          />
        </div>
       
       <div>
            <button type="submit">Create Project</button>
            </div>
          </form>
        </div>
      );
    }
    
export default NewProjectForm
