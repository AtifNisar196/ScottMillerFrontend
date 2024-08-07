import React, { useState, useEffect } from "react";
import "./payment.scss";

import paymentBook from "../../assets/images/banner-side.png";
import arrow from "../../assets/images/arrow1.png";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { Link } from "react-router-dom";

const Payment = ({ onBack }) => {
  const [value, setValue] = useState(1);
  const minValue = 1; // Minimum allowed value

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    // Check if the new value is greater than or equal to the minimum value
    if (newValue >= minValue) {
      setValue(newValue);
    }
  };
  return (
    <>
      {/* <section className="books-header">
        <Header />
      </section> */}

      <section className="cart-banner-sec content-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="breadcrumbs">
                <Link to="/checkout">
                  <h6>
                    <i className="fa fa-check"></i> <b>Checkout</b>
                  </h6>
                </Link>
                <img src={arrow} alt="" />
                <Link to="/shipping">
                  <h6>
                    <b>Shipping</b>
                  </h6>
                </Link>
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
                  <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                  <span>Credit card</span>
                </div>

                <div className="payment-feilds">
                  <h5 className="mb-3">Payment Details</h5>
                  <label htmlFor="">Card Holder Name</label>
                  <input type="text" />
                  <label htmlFor="">Card Number</label>
                  <input type="text" />
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="">Expiration Date</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="">CVV</label>
                      <input type="text" />
                    </div>
                  </div>
                  <button className="btn btn-secondary" onClick={onBack}>
                    Back
                  </button>
                  <button className="btn btn-primary">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="sec-toper">
        <Footer />
      </section> */}
    </>
  );
};

export default Payment;
