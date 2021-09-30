import React from "react";

import food_waste_graphic from "../../Assets/images/food-waste-infographic.jpg";
import LogInButton from "../../components/LogInButton/LogInButton";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import "./AboutPage.scss";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-page__main">
        <img
          className="about-page__main--infographic"
          src={food_waste_graphic}
          alt="food waste infographic"
        />
      </section>
      <aside>
        <p className="about-page__main--text">
          Food waste on this planet is an enormous issue.
        </p>
        <p className="about-page__main--text">
          New Orleans is one of the most revered cities for food in the world.
        </p>
        <p className="about-page__main--text">
          We created Second Helpings as a way to reduce food waste in our city{" "}
        </p>
        <p className="about-page__main--text">
          as well as celebrate restaurants as a source of community.
        </p>

        <div className="about-page__buttonbox">
          <SignUpButton />
          <LogInButton />
        </div>
      </aside>
    </div>
  );
};

export default About;
