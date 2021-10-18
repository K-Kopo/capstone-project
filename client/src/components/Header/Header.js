import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="header">
        <Link className="header__home" to="#">
          <FaBars className="header__bars" onClick={showSidebar} />
        </Link>
       <Link to="/" ><p className="header__title">Second Helpings</p></Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu__items" onClick={showSidebar}>
          <li className="nav-menu__items--toggle">
            <Link to="#" className="nav-menu__items--bars">
              <AiOutlineClose />
            </Link>
          </li>
          <li className="nav-menu__items--text">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-menu__items--text">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-menu__items--text">
            <Link to="/users">Users</Link>
          </li>
          <li className="nav-menu__items--text">
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
