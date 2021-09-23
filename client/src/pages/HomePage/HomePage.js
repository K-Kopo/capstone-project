import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import PhotoCarousel from "../../components/PhotoCarousel/PhotoCarousel"



const HomePage = () => {
  return (
    <section className="homepage">
      <div className="homepage__title">
      <h1>Second Helpings</h1>
      <p className="homepage__title--subtitle">Helping to connect those who <span className="white-highlight">have</span><br/> with those who <span className="white-highlight">need</span></p>
      </div>
      <div className="homepage__content">
      <article className="homepage__content--carousel">
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
      </div>
    </section>
  );
};

export default HomePage;
