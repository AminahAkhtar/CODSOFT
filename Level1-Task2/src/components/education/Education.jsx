import React from 'react'
import './education.css'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Education = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <section id='education'>
      <h2>My Education</h2>
      <div className="container services__container">
        <article data-aos="flip-up" className='service'>
          <div className="service__head">
            <h3>MATRICULATION</h3>
          </div>
          <ul className='service__list'>
            <li>
               <h3>KARACHI PUBLIC SCHOOL</h3>
            </li>
            <li>
               <h3 className='rank'>Percentage: 92.7%</h3>
            </li>
            <li>
               <h3>2018</h3>
            </li>
          </ul>
        </article>
        <article data-aos="zoom-in"className='service'>
          <div className="service__head">
            <h3>INTERMEDIATE</h3>
          </div>
          <ul className='service__list'>
            <li>
               <h3>BAMM PECHS GOVT COLLEGE FOR WOMEN</h3>
            </li>
            <li>
               <h3 className='rank'>Percentage: 90.23%</h3>
            </li>
            <li>
               <h3>2020</h3>
            </li>
          </ul>
        </article>
        <article data-aos="flip-down"className='service'>
          <div className="service__head">
            <h3>BACHELOR IN SOFTWARE ENGINEERING</h3>
          </div>
          <ul className='service__list'>
            <li>
               <h3>NED UNIVERISTY OF ENGINEERING AND TECHNOLOGY</h3>
            </li>
            <li>
               <h3 className='rank'>Current CGPA: 3.85</h3>
            </li>
            <li>
               <h3> 2020-Present</h3>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Education
