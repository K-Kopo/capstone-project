import React from 'react';
import "./HomePage.scss";
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="homepage">
            This is the home you've always dreamed of!
            <Link to="/signup" ><button>Sign Up / Log In</button></Link>
        </section>
    );
};

export default HomePage;