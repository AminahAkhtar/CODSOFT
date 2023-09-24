import React from 'react'
import './footer.css'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>Aminah Akhtar</a>
     <ul className='permalinks'>
      <li><a href="#">HOME</a></li>
      <li><a href="#about">ABOUT</a></li>
      <li><a href="#education">EDUCATION</a></li>
      <li><a href="#skill">SKILLS</a></li>
      <li><a href="#portfolio">PROJECTS</a></li>
      <li><a href="#contact">CONTACT</a></li>
     </ul>
      <div className='footer__copyright'>
         <small>&copy; Aminah Akhtar. All rights reserved</small>
      </div>
    </footer>
  )
}

export default Footer
