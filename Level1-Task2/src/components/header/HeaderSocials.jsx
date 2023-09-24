import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {BsFacebook} from 'react-icons/bs'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const HeaderSocials = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <div data-aos = "zoom-in-right" className='header__socials'>
      <a href="https://linkedin.com" target="_blank"><BsLinkedin/></a>
      <a href="https://github.com.com" target="_blank"><FaGithub/></a>
      <a href="https://facebook.com" target="_blank"><BsFacebook/></a>
    </div>
  )
}

export default HeaderSocials
