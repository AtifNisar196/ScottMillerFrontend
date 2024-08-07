import React, { useState, useEffect } from "react";
import "./shipping.scss";

// import mapImg from "../../assets/images/map.png";
import arrow from "../../assets/images/arrow1.png";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { Link } from "react-router-dom";

const Shipping = ({ onNext, onBack }) => {
  const [value, setValue] = useState(1);
  const minValue = 1;

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
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
                <Link to="#">
                  <h6>
                    <i className="fa fa-check"></i> <b>Checkout</b>
                  </h6>
                </Link>
                <img src={arrow} alt="" />
                <h6>
                  <b>Shipping</b>
                </h6>
                <img src={arrow} alt="" />
                <Link to="/payment">
                  <h6>Payment</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="address-flds">
                <h5 className="mb-3">Shipping Address</h5>
                <label htmlFor="">First Name</label>
                <input type="text" />
                <label htmlFor="">Last Name</label>
                <input type="text" />
                <label htmlFor="">City</label>
                <input type="text" />
                <label htmlFor="">Address</label>
                <input type="text" />
                <label htmlFor="">Postal Code</label>
                <input type="text" />
                <label htmlFor="">Apt, Suite</label>
                <input type="text" />
                <button onClick={onNext}>Next</button>
              </div>
              <button className="btn btn-secondary" onClick={onBack}>
                Back
              </button>
              {/* <button className="btn btn-primary" onClick={onNext}>
                Next
              </button> */}
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

export default Shipping;
