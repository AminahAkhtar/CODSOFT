import React from 'react'
import CV from '../../assets/AMINAH AKHTAR RESUME.pdf'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const CTA = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <div className="cta">
        <a data-aos="zoom-out" href={CV} download="AMINAH AKHTAR RESUME" className='btn'>Download CV</a>
        <a data-aos="zoom-out" href="#contact" className='btn btn-primary'>Let's Talk</a>
      
    </div>
  )
}

export default CTA
