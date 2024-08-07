import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

import "./header.scss";
import bookimg from "../../../assets/images/book4.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import Button from "../LogoutBtn/Button";
import CartDrawer from "../../CartDrawer/CartDrawer";
import baseurl from "../../../Config/config";
import { CircularProgress, colors } from "@mui/material";

const Header = () => {
  const [cartproducts, setCartProducts] = useState([]);
  const [error, setError] = useState(null);
  const [favproducts, setFavProducts] = useState([]);
  const local_token = localStorage.getItem("token");
  // console.log(local_token);

  const navbardata = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "About",
      link: "/about",
    },
    {
      id: 3,
      title: "Books",
      link: "/books",
    },
    {
      id: 4,
      title: "Blogs & Articles",
      link: "/blogs",
    },
    {
      id: 5,
      title: "Contact",
      link: "/contact",
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/cart/getAll`,
          config
        );
        setCartProducts(response.data.data.items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCartProducts();

    // Fetch wishlist items from the server or local storage
    const fetchWishlistItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/products/get-favourites`,
          config
        );
        setFavProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, []);

  return (
    <div className="headers-wrapper">
      <div className="upper-header-wrapper">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-9 col-sm-6 col-md-6 ">
              <div className="email-wrap">
                {/* <p>
                  <i className="fa fa-envelope"></i>
                  <span>
                    <a
                      href="mailto:smiller0224@aol.com"
                      style={{ color: "#000" }}
                    >
                      smiller0224@aol.com
                    </a>
                  </span>
                </p> */}
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="accounts-wrap-cart">
                <div className="accounts-wrap">
                  {local_token === null ? (
                    <div>
                      <i className="fa fa-user user-icon"></i>
                      <Link to="/login">Login</Link>
                    </div>
                  ) : (
                    <>
                      <Button />
                      <div className="wishlist-wrap">
                        <Link to="/dashboard">
                          <p className="mb-0">
                            <i
                              className="fa fa-tachometer"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </Link>
                      </div>
                    </>
                  )}
                  {/* <div>
                    <i className="fa fa-user user-icon"></i>
                    <Link to="/">Login</Link>
                  </div>
                  <div>
                    <Link to="/signup">Register</Link>
                  </div> */}
                  {/* <Button /> */}
                </div>
                <div className="wishlist-wrap">
                  <Link to="/wishlist">
                    <p className="mb-0">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      <span>{favproducts.length}</span>
                    </p>
                  </Link>
                </div>
                <div className="cart-wrap">
                  <Link onClick={toggleDrawer(true)}>
                    <p>{cartproducts.length}</p>

                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                  <CartDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-wrapper">
        <div className="container">
          <div
            className={`menu-Bar ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-lg-6">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`menu ${menuOpen ? "open" : ""}`}>
                <ul>
                  {navbardata.map((data) => (
                    <li key={data.id}>
                      <Link to={data.link}>{data.title}</Link>
                    </li>
                  ))}
                </ul>
                <div className="mobile-view">
                  <div className="accounts-wrap-cart">
                    <div className="accounts-wrap">
                      {local_token === null ? (
                        <div>
                          <i className="fa fa-user user-icon"></i>
                          <Link to="/login">Login</Link>
                        </div>
                      ) : (
                        <>
                          <div
                            className="wishlist-wrap"
                            style={{ textAlign: "left", marginLeft: "10px" }}
                          >
                            <Link to="/dashboard">
                              <p className="mb-0">
                                <i
                                  className="fa fa-tachometer"
                                  aria-hidden="true"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                Dashboard
                              </p>
                            </Link>
                          </div>
                          <div>
                            <Button />
                          </div>
                        </>
                      )}
                      {/* <div>
                        <i className="fa fa-user user-icon"></i>
                        <Link to="/login">Login</Link>
                      </div>
                      <div>
                        <Link to="/register">Register</Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
