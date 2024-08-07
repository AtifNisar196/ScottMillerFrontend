import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer-content-wrapper">
              <p>
                Copyright {"\u00A0"} © {"\u00A0"} 2024 Scott L.Miller Online. All
                Rights Reserved.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footerlinkswrapper">
              <ul className="footerlinks">
                {/* <li>
                  <Link>FAQ’s</Link>
                </li>
                <li>
                  <Link>Privacy and Policy</Link>
                </li>
                <li>
                  <Link>Terms and Condition</Link>
                </li> */}
              </ul>
              <ul className="socialLinks">
                {/* <li>
                  <Link>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
