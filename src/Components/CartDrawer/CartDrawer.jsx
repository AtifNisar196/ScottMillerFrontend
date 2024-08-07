import React, { useState, useEffect } from "react";
import "./cartdrawer.scss";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import baseurl from "../../Config/config";
import { Link } from "react-router-dom";

const CartDrawer = ({ open, toggleDrawer }) => {
  const [error, setError] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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
        const items = response.data.data.items;
        setCartProducts(items);
        calculateTotalAmount(items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCartProducts();
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalAmount(total);
  };

  const removeFromCart = async (productId, cartid) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        cart_id: cartid,
        item_id: productId,
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/cart/deleteItem`,
        data,
        config
      );
      if (response.data.status) {
        const updatedProducts = cartProducts.filter(
          (product) => product.id !== productId
        );
        setCartProducts(updatedProducts);
        calculateTotalAmount(updatedProducts);
      } else {
        // Handle error
      }
    } catch (error) {
      setError(error.message);
    } finally {
      window.location.reload();
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: { xs: 300, sm: 450 } }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div className="cart-wrapper">
        <div className="cart-head">
          <h3>Cart Item</h3>
        </div>
        {cartProducts.map((product) => (
          <div key={product?.id} className="cart-items">
            <div className="pro-item-inner">
              <div className="pro-img">
                <img
                  src={product?.product?.image || "default-image-url"}
                  alt={product?.product?.title || "Product image"}
                />
              </div>
              <div className="pro-details">
                <div className="pro-name">
                  {product?.product?.title || "Unnamed product"}
                </div>
                <div className="pro-desc">
                  <p>
                    {product?.product?.description ||
                      "No description available"}
                  </p>
                </div>
                <div className="pro-qty">Quantity: {product?.qty || 0}</div>
                <div className="pro-price">Price: ${product?.price || 0}</div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(product?.id, product?.cart_id)}
                style={{
                  padding: "0",
                  background: "transparent",
                  border: "none",
                  position: "absolute",
                  right: "-10px",
                  top: "10px",
                  marginTop: "-29px",
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h4>
            Total Amount: $
            {new Intl.NumberFormat().format(totalAmount.toFixed(2))}
          </h4>
        </div>
        <div className="checkout-button">
          {totalAmount > 0 ? (
            <Link to="/checkout" className="btn btn-primary">
              Checkout
            </Link>
          ) : (
            <button className="btn btn-primary" disabled>
              Checkout
            </button>
          )}
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CartDrawer;
