import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/mypic.png'
import HeaderSocials from './HeaderSocials'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Header = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
}, []);
  return (
    <header>
      <div className="container header__container">
      <h5 data-aos="zoom-in">Hello I'm</h5>
      <h1 data-aos="zoom-in">AMINAH AKHTAR</h1>
      <h5 data-aos="zoom-in" className="text-light">Web Developer</h5>
      <CTA/>
      <HeaderSocials/>
      <div data-aos="fade-up" className="me">
          <img src={ME} alt="me" />
      </div>
      </div>
    </header>
  )
}

export default Header
