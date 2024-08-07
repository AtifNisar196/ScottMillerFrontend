import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./checkout.scss";
import "../Shipping/shipping.scss";
import "../Payment/payment.scss";

import arrow from "../../assets/images/arrow1.png";
import paymentBook from "../../assets/images/banner-side.png";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from "@mui/material";
import baseurl from "../../Config/config";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const applicationId = import.meta.env.VITE_REACT_APP_SQUARE_APPLICATION_ID;
const locationId = import.meta.env.VITE_REACT_APP_SQUARE_LOCATION_ID;

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [cardid, setCardId] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [shippingid, setShippingId] = useState();
  const [shippingDetails, setShippingDetails] = useState({
    // fullName: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    // email: "",
    address: "",
    aptSuite: "",
  });

  const [shippingErrors, setShippingErrors] = useState({});

  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [paymentErrors, setPaymentErrors] = useState({});

  const [discountCode, setDiscountCode] = useState("");
  const [couponError, setCouponError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const cartResponse = await axios.get(
          `${baseurl.BASE_URL}api/frontend/cart/getAll`,
          config
        );
        const items = cartResponse.data.data.items;
        setCartProducts(items);

        const shippingResponse = await axios.get(
          `${baseurl.BASE_URL}api/shippings/getAll`,
          config
        );
        const shippingCharges = shippingResponse.data.data.amount;

        const defaultShippingCharge = shippingCharges;
        setShipping(defaultShippingCharge);
        setShippingId(shippingResponse.data.data.id);

        calculateTotalAmount(items, defaultShippingCharge);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleIncrement = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : product
      )
    );
  };

  const handleDecrement = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.qty > 1
          ? { ...product, qty: product.qty - 1 }
          : product
      )
    );
  };

  useEffect(() => {
    calculateTotalAmount(cartProducts, shipping);
  }, [cartProducts, shipping, discount]);

  // const calculateTotalAmount = (items, shippingCharge) => {
  //   const subtotal = items.reduce(
  //     (sum, item) => sum + item.price * item.qty,
  //     0
  //   );
  //   const vat = subtotal * 0.2;
  //   const total = subtotal + vat - discount + shippingCharge;

  //   setSubtotal(subtotal);
  //   setVat(vat);
  //   setTotalAmount(total);
  // };
  const calculateTotalAmount = (items, shippingCharge) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    console.log(items);
    const vat = subtotal * 0.2;
    const shippingCost = items.some(
      (product) => product.product.lulu_book_id !== null
    )
      ? shippingCharge
      : 0;
    const total = subtotal + vat - discount + shippingCost;

    setSubtotal(subtotal);
    setVat(vat);
    setTotalAmount(total);
  };

  const nextStep = () => {
    if (step === 2) {
      if (!validateShippingDetails()) {
        return;
      }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const validateShippingDetails = () => {
    const errors = {};
    // if (!shippingDetails.fullName) errors.fullName = "Full Name is required";
    if (!shippingDetails.city) errors.city = "City is required";
    if (!shippingDetails.address) errors.address = "Address is required";
    if (!shippingDetails.postalCode)
      errors.postalCode = "Postal Code is required";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyDiscount = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/coupons/getByCode`,
        {
          subtotal: subtotal,
          code: discountCode,
        },
        config
      );

      if (response.data.status) {
        toast.success("Discount has been applied");
        const discountAmount = response.data.data.discount;
        setDiscount(discountAmount);
        setDiscountCode("");
      } else {
        console.log(response.data.message);
        setCouponError(response.data.message);
        setDiscountCode("");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage =
          error.response.data.message ||
          "Internal Server Error. Please try again later.";
        setCouponError(errorMessage);
        toast.error(errorMessage);
      } else {
        const genericError = "Error applying discount code";
        setCouponError(genericError);
        toast.error(genericError);
      }
      setDiscountCode("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      //   name: shippingDetails.fullName,
      country: shippingDetails.country || "USA",
      city: shippingDetails.city,
      state: shippingDetails.state || "",
      post_code: shippingDetails.postalCode,
      phone: shippingDetails.phone || "",
      //   email_address: shippingDetails.email || "",
      address: shippingDetails.address,
      vat: (subtotal * 0.2).toFixed(2),
      subtotal: subtotal.toFixed(2),
      total: totalAmount.toFixed(2),
      product_id: cartProducts.map((product) => product.product.id),
      qty: cartProducts.map((product) => product.qty),
      price: cartProducts.map((product) => product.price),
      card_id: cardid,
      shipping_id: shippingid,
    };

    try {
      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/order/store`,
        payload,
        config
      );
      if (response.data.status) {
        toast.success("Order placed successfully!");
        navigate("/thankyou");
      } else {
        toast.error("Order placement failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error placing order: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardTokenizeResponse = (token, verifiedBuyer) => {
    setCardId(token.token);
    nextStep();
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-table">
                <table className="table-wrap">
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Title</th>
                      <th>Format</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="quantity-wrap">
                          <div className="add-sub-quantity">
                            <button
                              className="btn"
                              onClick={() => handleDecrement(product.id)}
                            >
                              -
                            </button>
                            <span>{product.qty}</span>
                            <button
                              className="btn"
                              onClick={() => handleIncrement(product.id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="about-book">
                          <img
                            src={product.product.image}
                            alt="book"
                            className="img-table"
                          />
                          <div className="book-info">
                            <h4>{product.product.title}</h4>
                            <p className="author">Scott Miller</p>
                          </div>
                        </td>
                        <td className="type">
                          {product.product.category.name}
                        </td>
                        <td className="price">
                          <span>
                            ${(product.price * product.qty).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order-summary-wrapper">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="order-summary-content">
                    <div className="order-summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="order-summary-row">
                      <span>VAT(20%)</span>
                      <span>${vat.toFixed(2)}</span>
                    </div>
                    <div className="order-summary-row">
                      <span>Discount</span>

                      <span>-${discount}</span>
                    </div>
                    <div className="order-summary-row">
                      <span>Shipping</span>
                      {cartProducts.some(
                        (product) => product.product.lulu_book_id !== null
                      ) ? (
                        <span>${shipping.toFixed(2)}</span>
                      ) : (
                        <span>$0.00</span>
                      )}
                    </div>
                  </div>

                  <div className="total-amount-content">
                    <div className="total-amount-row">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="discount-code-wrapper">
                    <h4>Add Discount Code</h4>
                    <form onSubmit={handleApplyDiscount}>
                      <div className="dis-inp-wrap">
                        <input
                          type="text"
                          placeholder="Discount code"
                          required
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button className="apply-btn" type="submit">
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="checkout-btn">
                    <button className="btn btn-primary" onClick={nextStep}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        );
      case 2:
        return (
          <section className="cart-banner-sec content-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="breadcrumbs">
                    <h6>
                      <i className="fa fa-check"></i> <b>Checkout</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>
                      <b>Shipping</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>Payment</h6>
                  </div>
                  <div className="pay-img float">
                    <img src={paymentBook} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-flds">
                    <h5 className="mb-3">Shipping Address</h5>

                    {/* <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingDetails.fullName}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.fullName && (
                      <span className="error">{shippingErrors.fullName}</span>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingDetails.email}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.email && (
                      <span className="error">{shippingErrors.email}</span>
                    )} */}

                    <label htmlFor="phone">Phone</label>
                    <input
                      type="phone"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.phone && (
                      <span className="error">{shippingErrors.phone}</span>
                    )}

                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingDetails.country}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.country && (
                      <span className="error">{shippingErrors.country}</span>
                    )}

                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.city && (
                      <span className="error">{shippingErrors.city}</span>
                    )}

                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.state && (
                      <span className="error">{shippingErrors.state}</span>
                    )}

                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.address && (
                      <span className="error">{shippingErrors.address}</span>
                    )}
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={handleShippingChange}
                    />
                    {shippingErrors.postalCode && (
                      <span className="error">{shippingErrors.postalCode}</span>
                    )}
                    <label htmlFor="aptSuite">Apt, Suite</label>
                    <input
                      type="text"
                      name="aptSuite"
                      value={shippingDetails.aptSuite}
                      onChange={handleShippingChange}
                    />
                    <button className="btn btn-primary" onClick={nextStep}>
                      Next
                    </button>
                    <button className="btn btn-secondary" onClick={prevStep}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="cart-banner-sec content-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="breadcrumbs">
                    <h6>
                      <i className="fa fa-check"></i> <b>Checkout</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>
                      <b>Shipping</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>
                      <b>Payment</b>
                    </h6>
                  </div>
                  <div className="pay-img float">
                    <img src={paymentBook} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-flds">
                    <h5 className="mb-3">Choose Payment Method</h5>
                    <div className="credit-card-wrapper">
                      <i
                        className="fa fa-credit-card-alt"
                        aria-hidden="true"
                      ></i>
                      <span>Credit card</span>
                    </div>

                    <form>
                      <div className="form-group">
                        <label htmlFor="cardElement">
                          Credit or Debit Card
                        </label>
                        <PaymentForm
                          applicationId={applicationId}
                          cardTokenizeResponseReceived={
                            handleCardTokenizeResponse
                          }
                          locationId={locationId}
                        >
                          <CreditCard />
                        </PaymentForm>
                      </div>
                    </form>
                    <button className="btn btn-secondary" onClick={prevStep}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        );
      case 4:
        return (
          <section className="cart-banner-sec content-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="breadcrumbs">
                    <h6>
                      <i className="fa fa-check"></i> <b>Checkout</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>
                      <b>Shipping</b>
                    </h6>
                    <img src={arrow} alt="" />
                    <h6>
                      <b>Payment</b>
                    </h6>
                  </div>
                  <div className="pay-img float">
                    <img src={paymentBook} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-flds">
                    <h5 className="mb-3">Choose Payment Method</h5>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="cardElement">
                          Note: Confirm Your Order if you are satisfied with
                          your order
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Confirm Payment
                      </button>
                    </form>
                    <button className="btn btn-secondary" onClick={prevStep}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="content-sec">
        <div className="container">{renderStep()}</div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
