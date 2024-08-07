import React, { useState, useEffect } from "react";
import axios from "axios";
import "./books.scss";
import bookimage1 from "../../assets/images/book3.png";
import Header from "../../Components/CommonComponents/Header/Header";
import GalleryHome from "../../Components/GalleryHome/GalleryHome";
import HomeTestimonials from "../../Components/HomeTestimonials/HomeTestimonials";
import SubscribeFormHome from "../../Components/SubscribeFormHome/SubscribeFormHome";
import BlogsHome from "../../Components/BlogsHome/BlogsHome";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { Box, CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../Config/config";

const Books = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const local_token = localStorage.getItem("token");

  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleAddToCart = async (productId, price, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to add items to the cart");

      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/cart/store`,
        {
          product_id: productId,
          price: price,
          qty: quantity,
          subtotal: price * quantity,
          total: price * quantity,
        },
        config
      );

      console.log("Cart item added successfully:", response.data);
      toast.success("Cart item added successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      window.location.reload();
    }
  };

  const handleAddToFavourite = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to add items to favorites");
      // navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/products/add-favourite`,
        {
          id: productId,
        },
        config
      );

      toast.success("Favorite item added successfully");
    } catch (error) {
      console.error("Error adding item to favorites:", error);
      toast.error("Error adding item to favorites");
    } finally {
      window.location.reload();
    }
  };

  const fetchProducts = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${baseurl.BASE_URL}api/frontend/products/getAll?page=${page}`,
        config
      );
      setProducts(response.data.data.data);
      setTotalPages(response.data.data.last_page);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />

      <div className="about-banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-banner">
                <h3>Get The Book You Love</h3>
                <h2>Scott L Miller Books</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="books-containing-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {products.map((item) => {
                return (
                  <div className="book-info" data-aos-duration="1000">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="book-info-img">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="book-tags">
                          <p>{item.category.name}</p>
                        </div>
                        <div className="book-info-content">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <h4>
                            <Link
                              to={`/product/${item.id}`}
                              className="details-link my-3"
                            >
                              View Details
                            </Link>
                          </h4>
                        </div>
                        <div className="book-bottom-desc">
                          <div>
                            <h4>Written By:</h4>
                            <p>{item.wittenby}</p>
                          </div>
                          <div>
                            <h4>Publisher</h4>
                            <p>{item.publisher}</p>
                          </div>
                          <div>
                            <h4>Year</h4>
                            <p>{item.year}</p>
                          </div>
                          {/* <div className="stars">
                            {Array.from({ length: 5 }, (_, index) => (
                              <i
                                key={index}
                                className={`fa fa-star${
                                  index < item.rating ? "" : "-o"
                                }`}
                                aria-hidden="true"
                              ></i>
                            ))}
                          </div>

                          <div className="rating">
                            <p>{item.rating}</p>
                            <span>
                              {" "}
                              {item.reviews ? item.reviews : 0} Reviews
                            </span>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="book-info-right">
                          <div className="promo">
                            {item.disc_price > 0 ? (
                              <p>
                                <ins>${item.price}</ins>{" "}
                                <del>${item.disc_price}</del>
                              </p>
                            ) : (
                              <p>
                                <ins>${item.price}</ins>
                              </p>
                            )}
                          </div>
                          <div className="price-cart-wrapper">
                            <div className="cart-fav-wrap">
                              <button
                                className="add-to-cart"
                                onClick={() =>
                                  handleAddToCart(item.id, item.price, quantity)
                                }
                              >
                                Add to Cart
                              </button>
                              <button
                                className={`add-to-fav ${
                                  item.my_favourite ? "active" : ""
                                }`}
                                onClick={() => handleAddToFavourite(item.id)}
                              >
                                <i
                                  className="fa fa-heart-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                className="pagination"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-about">
        <GalleryHome />
      </section>
      <section className="about-testimonial sec-toper">
        <HomeTestimonials />
      </section>
      <section className="blogs-about">
        <div className="blog">
          <h4>Blogs & Article</h4>
        </div>
        <BlogsHome />
      </section>
      <section className="subscribe-form-about book-sub">
        <SubscribeFormHome />
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Books;
