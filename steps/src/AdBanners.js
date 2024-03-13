import React, { useState } from 'react'

export const SliderData = [{ image: "https://www.bookswagon.com/bannerimages/80_inr.jpg?v=4.3" },
{ image: "https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.5" }, { image: "https://www.bookswagon.com/bannerimages/83_inr.jpg?v=5.0" }, { image: "https://www.bookswagon.com/bannerimages/83_inr.jpg?v=5.0" }]


function AdBanners() {
    const [current,setCurrent]=useState(0);
    const length = SliderData.length;

    function nextSlide(){
        setCurrent(current===length?0:current+1);
    }
    function prevSlide(){
        setCurrent(current===0?length-1:current-1);
    }

  return (
    <div>
    <i className="far left-arrow" onClick={prevSlide} />                   
     <i className="far right-arrow" onClick={nextSlide} />
      
    </div>
  )
}

export default AdBanners
