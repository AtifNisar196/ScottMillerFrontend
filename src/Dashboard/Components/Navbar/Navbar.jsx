import React, { useState, useEffect } from "react";
import "./navbar.scss";
import logo from "../../../assets/images/logo.png";
import person from "../../Assets/Images/person.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/sidebar";
import baseurl from "../../../Config/config";

const Navbar = () => {
  const username = localStorage.getItem("name");

  const role = localStorage.getItem("role");

  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [loading, SetLoading] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("ovr-hiddn");
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("ovr-hiddn");
      document.body.classList.remove("overflw");
    };
  }, []);

  const handleLogout = async () => {
    SetLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${baseurl.BASE_URL}api/auth/logout`, null, config);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("tokenExpiry");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      SetLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      {/* {console.log(user)} */}
      <div className="navbar-wrapper">
        <div className="container-fluid">
          <div
            className={`menu-Bar ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row d-flex align-items-center ">
            <div className="col-md-12 col-lg-2 ">
              <div className="navbar-logo-wrapper">
                <Link to="/dashboard">
                  <img
                    src={logo}
                    alt="scott logo"
                    style={{ width: "100px" }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-0 col-lg-7">
              {/* <div className="navbar-search-wrapper">
                <input type="text" placeholder="Search" />
              </div> */}
            </div>
            <div className="col-md-0 col-lg-3">
              <div className={`menu-overlay ${menuOpen ? "active" : ""}`}></div>
              <div className={`menuWrap ${menuOpen ? "open" : ""}`}>
                <div className="menu">
                  <Sidebar />
                </div>
                <div className="navbar-links-wrapper">
                  <div className="profile-wrap" onClick={toggleCollapse}>
                    <div className="profile-wrapper">
                      <div className="profile-pic">
                        <img
                          src={person}
                          alt="user profile picture"
                          className="profile-image"
                        />
                      </div>
                      <div className="profile-details">
                        <p>
                          <span>Welcome!</span>
                          <br />
                          Scott Miller
                        </p>
                      </div>
                    </div>
                    <div className="profile-icon-wrap">
                      <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </div>
                    <div
                      className={`logout-btn-wrap ${
                        collapsed ? "collapse" : "collapse show"
                      }`}
                    >
                      {loading ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <button className="logout-btn" onClick={handleLogout}>
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="navbar-links-wrapper desk">
                {/* <div className="bell-icon">
                  <i className="fa fa-bell" aria-hidden="true"></i>
                </div> */}
                <div className="profile-wrap" onClick={toggleCollapse}>
                  <div className="profile-wrapper">
                    <div className="profile-pic">
                      <img
                        src={person}
                        alt="user profile picture"
                        className="profile-image"
                      />
                      {role === "admin" ? (
                        <div className="profile-details">
                          <p>
                            <span>Welcome!</span>
                            <br />
                            Scott Miller
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="profile-icon-wrap">
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                  </div>
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <div
                      className={`logout-btn-wrap ${
                        collapsed ? "collapse" : "collapse show"
                      }`}
                    >
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={toggleCollapse}>Collapsible</button>
      <div className={collapsed ? "collapse" : "collapse show"}>
        Lorem ipsum dolor text....
      </div> */}
    </>
  );
};

export default Navbar;
