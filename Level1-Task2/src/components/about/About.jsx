import React from 'react'
import './about.css'
import ME from '../../assets/mypic.png'
import {FaAward} from 'react-icons/fa'
import {MdOutlineComputer} from 'react-icons/md'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const About = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div  className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About image" />
          </div>
        </div>
        <div className="about__content">
           <div className="about__cards">
            <article data-aos="flip-left"className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>3+ Months Working</small>
            </article>

            <article data-aos="flip-right" className='about__card'>
              <MdOutlineComputer className='about__icon'/>
              <h5>Projects</h5>
              <small>7+ Compeleted Projects</small>
            </article>

           </div>

           <p data-aos="fade-right">I'm a skilled developer currently pursuing the bachelors degree in software engineering from NED university. I'm always looking forward to learn new and innovative technical skills.</p>
           <a data-aos="fade-left" href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>

    </section>
  )
}

export default About
