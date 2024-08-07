import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";


const Thankyou = () => {
  return (
    <>
    <Header/>
      <div className="about-banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-banner">
                <h2>ThankYou</h2>
                <Link to="/home">
                  <p className="text-center">Let's Back To Shopping</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Thankyou;
