import React, {useState} from 'react'
import {
    Link, useNavigate
  } from "react-router-dom";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
let navigate = useNavigate()



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    navigate('/login');
  }

  const userType = localStorage.getItem('user-type');
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" bg="dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">JobNestHub.com</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/"></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/"></Link>
        </li>
        </ul>
        <ul>
          
        </ul>
        


{!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup">
                Signup
              </Link>
            </form>
          ) : (
            <form className="d-flex">
              {userType === 'candidate' && ( 
                <Link className="btn btn-primary mx-2" to="/candidateDashboard">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  Candidate Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-primary mx-2">
                Logout
              </button>
            </form>
          )}
    </div>
  </div>
</nav>
  )
}

export default Navbar

