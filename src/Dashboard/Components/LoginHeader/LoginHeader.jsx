import React from "react";
import "./loginheader.scss";
import Logo from "../../Assets/Images/logo.png";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="loginheader">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="logo-wrapper">
              <img src={Logo} alt="" />
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="links-wrapper">
              <ul>
                <li>
                  Need help?
                  <span >
                    <Link to="/">Talk to Us</Link>
                  </span>
                </li>
                <li>
                  <Link to="">
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
