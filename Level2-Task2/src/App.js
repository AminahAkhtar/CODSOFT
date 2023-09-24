import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
// import Alert from "./components/Alert"
import Signup from "./components/Signup";
import Apply from "./components/Apply"
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidateDashboard from "./components/CandidateDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import PostJob from "./components/PostJob";
import HeroSection from "./components/HeroSection";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <HeroSection/>
        <ToastContainer />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/candidateDashboard" element={<CandidateDashboard />}/>
        <Route path="/employerDashboard" element={<EmployerDashboard />}/>
        <Route path="/postJob" element={<PostJob/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
