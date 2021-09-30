import React from "react";
import "./SignUpButton.scss";
import { Link } from "react-router-dom";


const SignUpButton = () => {
  return (
    <div>
      <Link to="/signup">
        <button className="signup-btn">Sign Up</button>
      </Link>
    </div>
  );
};

export default SignUpButton;
