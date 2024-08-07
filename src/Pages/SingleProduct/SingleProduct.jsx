import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./singleproduct.scss";

// import cartImg from "../../assets/images/cart-img.png";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { Box, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../Config/config";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const minValue = 1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/products/getById?id=${id}`,
          config
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= minValue) {
      setValue(newValue);
    }
  };

  const handleAddToFavourite = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to add items to favorites");
      navigate("/login");
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

  const handleAddToCart = async (productId, price, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to add items to the cart");
      navigate("/login");
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
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      window.location.reload();
    }
  };

  if (!product) {
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
    <>
      <ToastContainer />

      <section className="books-header">
        <Header />
      </section>

      <section className="cart-banner-sec content-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="cart-img">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-md-5">
              <div className="single-product">
                <h6>Best Seller</h6>
                <h5>{product.title}</h5>
                {product.disc_price > 0 ? (
                  <p>
                    <ins>${product.price}</ins> <del>${product.disc_price}</del>
                  </p>
                ) : (
                  <p>
                    <ins>${product.price}</ins>
                  </p>
                )}

                <div>
                  <h3>Description</h3>
                  <small className="truncated-text">
                    {product.description}
                  </small>
                </div>

                <div className="product-qty">
                  <h3>Quantity</h3>
                  <input
                    type="number"
                    placeholder="1"
                    value={value}
                    onChange={handleChange}
                    min={minValue}
                  />
                </div>

                {/* <button className="buynow-btn mt-4">Buy Now</button> */}
                <div className="row addtocart-btn my-3">
                  <div className="col-md-6">
                    <button
                      onClick={() =>
                        handleAddToCart(product.id, product.price, value)
                      }
                    >
                      <i className="fa fa-shopping-cart"></i> Add To Cart
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button onClick={() => handleAddToFavourite(product.id)}>
                      <i className="fa fa-heart"></i> Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-toper">
        <Footer />
      </section>
    </>
  );
};

export default SingleProduct;
