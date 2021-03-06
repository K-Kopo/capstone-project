import React, { Component } from "react";
import Slider from "react-slick";
import photo1 from "../../Assets/images/foodbank1.jpeg";
import photo2 from "../../Assets/images/foodbank2.jpeg";
import photo3 from "../../Assets/images/foodbank3.jpeg";
import photo4 from "../../Assets/images/restaurant1.jpeg";
import photo5 from "../../Assets/images/restaurant3.jpeg";
import "./PhotoCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Fade extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      autoplay: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        
        <Slider {...settings}>
          <div className="carousel-box">
            <img className="carousel-photos" src={photo1} alt={"food pantry"}/>
          </div>
          <div className="carousel-box">
            <img className="carousel-photos" src={photo2} alt={"close up on pantry shelves"}/>
          </div>
          <div className="carousel-box">
            <img className="carousel-photos" src={photo3} alt={"workers unloading donations"}/>
          </div>
          <div className="carousel-box">
            <img className="carousel-photos" src={photo4} alt={"food on a table"}/>
          </div>
          <div className="carousel-box">
            <img className="carousel-photos" src={photo5} alt={"chef in a kitchen"}/>
          </div>
        </Slider>
      </div>
    );
  }
}