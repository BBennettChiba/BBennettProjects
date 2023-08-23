import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function Slideshow ({images}) {
    
  const properties ={
    duration: 1000,
    infinite: true,
    autoplay: true,
    arrows: false
  }

  return (
    <div className="slide-container">
      <Fade {...properties}>
        {images.map(a=>(<div className="each-fade">
          <div className="image-container">
            <img src={a} />
          </div>
        </div>))}
      </Fade>
    </div>
  )
}