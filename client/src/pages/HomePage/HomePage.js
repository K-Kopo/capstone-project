import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import PhotoCarousel from "../../components/PhotoCarousel/PhotoCarousel"



const HomePage = () => {
  return (
    <section className="homepage">
      <article className="carousel">
      <PhotoCarousel />
      </article>
      <article className="homepage__buttonbox">
        <Link to="/signup">
          <button className="homepage__signup-btn">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="homepage__login-btn">Log In</button>
        </Link>
      </article>
    </section>
  );
};

export default HomePage;
