import React from 'react'
import './skill.css'
import {BsPatchCheckFill} from 'react-icons/bs'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Skill = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <section id='skill'>
      <h5>What Skills I Have</h5>
      <h2>My Skills</h2>
      <div className="container experience__container">
      <div data-aos="zoom-out"className="experience__web">
         <h3>Web Development Skills</h3>
         <div className="experience__content">
          <article  className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-left">HTML</h4> 
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-left">CSS</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill className='experience__details-icon' />
            <h4 data-aos = "fade-left">Javascript</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-left">Bootstrap</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-left">PHP</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-left">React</h4>
          </article>
         </div>
      </div>
      <div data-aos="zoom-out" className="experience__programming">
      <h3>Other Programming Skills</h3>
         <div className="experience__content">
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-right">Python</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-right">C++</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-right">C#</h4>
          </article>
          <article className="experience__details">
            <BsPatchCheckFill  className='experience__details-icon'/>
            <h4 data-aos = "fade-right">MySQL</h4>
          </article>
         </div>
      </div>
      </div>
    
    </section>
  )
}

export default Skill
