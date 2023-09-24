import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
let navigate = useNavigate()

    // Function to handle logout
    const handleLogout = () => {
      // Clear the token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      // Redirect to the login page
      navigate('/');
    };
  useEffect(() => {
    // Fetch the list of tasks assigned to the logged-in user
    fetch('http://localhost:5000//api/Task/userTasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming you store the token in local storage
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={handleLogout} className='btn btn-primary'>Logout</button> {/* Add the logout button */}
      {tasks.length === 0 ? (
        <p>No tasks assigned to you.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.name}</h3>
              <p>Description: {task.description}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
              {task.project && (
                <p>Project: {task.project.title}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks
