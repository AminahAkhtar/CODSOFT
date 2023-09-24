import React from 'react'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Skill from './components/skills/Skill'
import Education from './components/education/Education'
import Portfolio from './components/portfolio/Portfolio'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
   <>
   <Header/>
   <Nav/>
   <About/>
   <Education/>
   <Skill/>
   <Portfolio />
   <Contact />
   <Footer />
   </>
  )
}

export default App
