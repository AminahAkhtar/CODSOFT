import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PostJob = () => {
  let navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState({
      title: '',
      description: '',
      company: '',
      location: '',
      jobType: '', 
      skillsRequired: [],
      category: '', 
      salary: '',
      applicationDeadline: '',
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          // console.log(jobDetails);
          // Send a POST request to your API endpoint with jobDetails
          const response = await fetch('http://localhost:5000/api/jobs/newjob', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'), // Include authentication token if required
            },
            body: JSON.stringify(jobDetails),
          });
          // console.log(jobDetails);
          if (response.ok) {
            toast.success("Job Posted Successfully")
            navigate('/employerDashboard')
          } else {
            // Handle error responses from the server
            console.error('Failed to post job');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        // For the skillsRequired field, split the comma-separated string into an array
        if (name === 'skillsRequired') {
          const skillsArray = value.split(',').map((skill) => skill.trim());
          setJobDetails({ ...jobDetails, [name]: skillsArray });
        } else if (name === 'jobType' || name === 'category') {
          // For jobType and category, set the value directly
          setJobDetails({ ...jobDetails, [name]: value });
        } else {
          setJobDetails({ ...jobDetails, [name]: value });
        }
      };
      
    
      return (
        <div>
        
           <div>
               <form className='container my-5' onSubmit={handleSubmit}>
               <h2>Post a New Job</h2>
               <div className="mb-3">
                 <label htmlFor="title" className="form-label">Title</label>
                 <input type="text" className="form-control" value={jobDetails.title}
                onChange={handleChange} id="title" name="title" aria-describedby="emailHelp"/>
               </div>
               <div className="mb-3">
                 <label htmlFor="description" className="form-label" >Description</label>
                 <input type="text" className="form-control"value={jobDetails.description} onChange={handleChange} id="description" name="description"/>
               </div>
               <div className="mb-3">
                 <label htmlFor="company" className="form-label" >Company Name</label>
                 <input type="text" className="form-control"value={jobDetails.company} onChange={handleChange} id="company" name="company"/>
               </div>
               <div className="mb-3">
                 <label htmlFor="location" className="form-label" >Location</label>
                 <input type="text" className="form-control"value={jobDetails.location} onChange={handleChange} id="location" name="location"/>
               </div>

               <div className="mb-3">
                 <label htmlFor="salary" className="form-label" >Salary</label>
                 <input type="text" className="form-control"value={jobDetails.salary} onChange={handleChange} id="salary" name="salary"/>
               </div>
               <div className="mb-3">
  <label htmlFor="jobType" className="form-label">Job Type</label>
  <select
    id="jobType"
    name="jobType"
    className="form-control"
    value={jobDetails.jobType}
    onChange={handleChange} // Use the handleChange function here
  >
    <option value="">Select Job Type</option>
    <option value="Experienced Level">Experienced Level</option>
    <option value="Mid Level">Mid Level</option>
    <option value="Entry Level">Entry Level</option>
  </select>
</div>



               <div className="mb-3">
                 <label htmlFor="skillsRequired" className="form-label" >Skills Required (Comma-separated)</label>
                 {/* <input type="text" className="form-control"value={jobDetails.skillsRequired} onChange={handleChange} id="skillsRequired" name="skillsRequired"/> */}
                 <input
  type="text" className="form-control"
  value={jobDetails.skillsRequired.join(', ')} // Convert the array to a string
  onChange={(e) => setJobDetails({ ...jobDetails, skillsRequired: e.target.value.split(', ') })} id="skillsRequired" name="skillsRequired"// Convert the string back to an array
/>
               </div>

               <div className="mb-3">
  <label htmlFor="category" className="form-label">Category</label>
  <select
    id="category"
    name="category"
    className="form-control"
    value={jobDetails.category}
    onChange={handleChange} // Use the handleChange function here
  >
    <option value="">Select Category</option>
    <option value="Programming">Programming</option>
    <option value="SQA">SQA</option>
    <option value="UI/UX Designer">UI/UX Designer</option>
    <option value="Data Analyst">Data Analyst</option>
  </select>
</div>
               <div className="mb-3">
                 <label htmlFor="applicationDeadline" className="form-label" >Application Deadline</label>
                 <input type="date" className="form-control"value={jobDetails.applicationDeadline} onChange={handleChange} id="applicationDeadline" name="applicationDeadline"/>
               </div>
               <button type="submit" className="btn btn-primary" >Post Job</button>
             </form>
             </div>
            
          
        </div>
        
      );
    };
    

export default PostJob
