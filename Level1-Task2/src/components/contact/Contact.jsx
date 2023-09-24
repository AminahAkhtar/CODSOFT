import React from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {BsFacebook} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Contact = () => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_51wz3mm', 'template_ezesggo', form.current, 'vHI53fmBFcZYksu-_')
    e.target.reset()
    }; 
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article data-aos="flip-up" className="contact__option">
            <MdOutlineEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>aminah30akhtar3a@gmail.com</h5>
          </article>
          <article data-aos="flip-up" className="contact__option">
            <BsFacebook className='contact__option-icon'/>
            <h4>Facebook</h4>
            <h5>Aminah Akhtar</h5>
          </article>
          <article  data-aos="flip-up" className="contact__option">
            <BsLinkedin className='contact__option-icon'/>
            <h4>LinkedIn</h4>
            <h5>Aminah Akhtar</h5>
          </article>
        </div>
        <form  data-aos ="fade-up" ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder='Your Full Name' required />
          <input type="email" name="email" placeholder='Your Email' required />
          <textarea  name="message" rows="7" placeholder='Your Message' required ></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
