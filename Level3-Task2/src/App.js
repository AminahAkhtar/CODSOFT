// App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Tasks from './components/Tasks';
import Project from './components/Project';
import NewProjectForm from './components/NewProjectForm';
function App() {
// let navigate = useNavigate()
//   useEffect(() => {
//     // Check if the user is logged in and their role
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (token) {
//       if (role === 'Project Manager') {
//         // Redirect to projects if the user is a Project Manager
//         navigate('/projects');
//       } else if (role === 'Team Member') {
//         // Redirect to tasks if the user is a Team Member
//         navigate('/tasks');
//       }
//     }
//   }, []);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route exact path="/projects" element={<Project/>} />
        <Route path="/newproject" element={<NewProjectForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
