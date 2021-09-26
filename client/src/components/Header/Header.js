import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.scss";

const Header = () => {
    return (
        <nav className="header">
            <Link className="header__home" to="/">HOME</Link>
            <ul className="header__navlist">
                <li className="header__navlist--link"><Link to="/about" >About</Link ></li>
                {/* <li className="header__navlist--link"><Link to="/donations" >Donations</Link></li> */}
                <li className="header__navlist--link"><Link to="/signup" >SignUp</Link></li>
                {/* <li className="header__navlist--link"><Link to="/login" >Login</Link></li> */}
            </ul>
             
        </nav>
    );
};

export default Header;