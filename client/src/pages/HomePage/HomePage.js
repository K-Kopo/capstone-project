import React from 'react';
import "./HomePage.scss";
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="homepage">
            <div>
            <Link to="/signup" ><button className="homepage__signup-btn">Sign Up</button></Link>
            <Link to="/login" ><button className="homepage__login-btn">Log In</button></Link>
            </div>
        </section>
    );
};

export default HomePage;