import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.scss";

const Header = () => {
    return (
        <nav className="header">
            <Link to="/">HOME</Link>
            <ul className="header__navlist">
                <li className="header__navlist--link"><Link to="/users/:id" >Users</Link ></li>
                <li className="header__navlist--link"><Link to="/donations/:id" >Donations</Link></li>
                <li className="header__navlist--link"><Link to="/signup" >SignUp</Link></li>
            </ul>
             
        </nav>
    );
};

export default Header;