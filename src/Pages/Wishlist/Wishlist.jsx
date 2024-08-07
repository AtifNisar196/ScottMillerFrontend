import React, { useEffect, useState } from "react";
import axios from "axios";
import "./wishlist.scss";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { Box, CircularProgress } from "@mui/material";
import baseurl from "../../Config/config";
import { textDecoration } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setWishlistItems(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/products/add-favourite`,
        {
          id: itemId,
        },
        config
      );

      console.log("Cart item added successfully:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
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
console.log(wishlistItems)
  if (wishlistItems.length === 0) {
    return (
      <>
        <Header />
        <div className="about-banner-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="about-banner">
                  <h3>The Book You Love</h3>
                  <h2>Wishlist</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wishlist text-center">
          <div className="row">
            <div className="col-md-12 my-5">
              <div className="wishlist-item">
                <p>Your wishlist is empty.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="about-banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-banner">
                <h3>The Book You Love</h3>
                <h2>Wishlist</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row wish-wrap">
          {console.log(wishlistItems)}
          {wishlistItems.map((item) =>
            item && item.product ? (
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="wrap">
                  <img src={item.product.image} alt={item.product.title} />
                  <div className="item-details">
                    <h3>{item.product.title}</h3>
                    <p>{item.product.description}</p>
                    <Link
                      to={`/product/${item.product_id}`}
                      className="details-link my-3"
                      style={{
                        textDecoration: "none",
                        color: "#455e88",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        margin: "10px 0px",
                      }}
                    >
                      View Details
                    </Link>
                    <h5>Price: ${item.product.price}</h5>

                    <button
                      className="remove-btn-wish"
                      onClick={() => handleRemoveFromWishlist(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
