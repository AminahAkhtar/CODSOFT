import React from 'react'
import hero from "../images/hero.jpg"
const HeroSection = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"  >
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={hero} alt="First slide" style={{ maxHeight: '700px' }} />
        <div className="carousel-caption my-5">
    <h1>Welcome to Job Portal: Where Dreams and Careers Converge – Your journey to the perfect job starts here</h1>
   
  </div>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={hero} alt="Second slide" style={{ maxHeight: '700px' }}/>
        <div className="carousel-caption my-5">
    <h1>Empowering Job Seekers and Employers: Connecting talents with opportunities to shape brighter futures</h1>
   
  </div>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={hero} alt="Third slide" style={{ maxHeight: '700px' }}/>
        <div className="carousel-caption my-5">
    <h1>Experience the Future of Job Hunting: Join a community of driven professionals making their career aspirations a reality</h1>
    
  </div>
      </div>
    </div>
    <a className="carousel-control-prev " href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  )
}

export default HeroSection
