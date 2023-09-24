import React from 'react'
import './portfolio.css'
import img1 from '../../assets/restaurant.png'
import img2 from '../../assets/kids.png'
import img3 from '../../assets/coffee.png'
import img4 from '../../assets/ecommerce.png'
import img5 from '../../assets/flight.png'
import img6 from '../../assets/supermarket.png'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Portfolio = () => {

  useEffect(() => {
          Aos.init({duration: 2000});
  }, []);
  
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>My Projects</h2>

      <div className="container portfolio__container">
      <article data-aos = "fade-right" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img2} alt="" height={300}/>
          </div>
          <h3>Kids Learning Website</h3>
          <p>REACT</p>
        </article>
        <article data-aos = "fade-left" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img1} alt="" height={300}/>
          </div>
          <h3>Restaurant Website</h3>
          <p>HTML, CSS, JS</p>
        </article>
        <article data-aos = "fade-right" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img4} alt=""  height={300}/>
          </div>
          <h3>Ecommerce Website</h3>
          <p>HTML, CSS, JS, PHP</p>
        </article>
        <article data-aos = "fade-left" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img3} alt=""  height={300}/>
          </div>
          <h3>Coffee Shop Website</h3>
          <p>HTML, CSS, JS</p>
        </article>

        <article data-aos = "fade-right" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img5} alt="" height={300}/>
          </div>
          <h3>Flight Booking System</h3>
          <p>Python, MS ACCESS</p>
        </article>
        <article data-aos = "fade-left" className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={img6} alt=""height={300} />
          </div>
          <h3>Supermarket Management System</h3>
          <p>C#, MS ACCESS</p>
        </article>
      </div>
    </section>
  )
}

export default Portfolio
