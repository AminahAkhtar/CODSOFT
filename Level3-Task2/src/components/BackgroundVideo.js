import React from 'react';
import './BackgroundVideo.css'

const BackgroundVideo = () => {
    const videoSource = require('../assests/video.mp4');
  return (
    <video autoPlay loop muted className="background-video">
    <source src={videoSource} type="video/mp4" />
  </video>
  );
};

export default BackgroundVideo;
