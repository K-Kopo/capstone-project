import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import PhotoCarousel from "../../components/PhotoCarousel/PhotoCarousel"
import LogInButton from "../../components/LogInButton/LogInButton";
import SignUpButton from "../../components/SignUpButton/SignUpButton";



const HomePage = ({history}) => {
  return (
    <section className="homepage">
      <div className="homepage__title">
      <h1>Second Helpings</h1>
      <p className="homepage__title--subtitle">A community oriented effort to reduce food waste by<br/>
      helping to connect those who <span className="white-highlight">have</span> (restaurants)<br/> with those who <span className="white-highlight">need</span> (food banks)</p>
      </div>
      <div className="homepage__content">
      <article className="homepage__content--carousel">
      <PhotoCarousel />
      </article>
      <article className="homepage__buttonbox">
        <SignUpButton />
        <LogInButton history={history}/>
      </article>
      </div>
    </section>
  );
};

export default HomePage;
