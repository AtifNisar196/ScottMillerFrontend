import React from "react";
import "./collection.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import CustomerDashboard from "../../Components/CustomerDashboard/CustomerDashboard";

const Collection = () => {
  const verifyRole = localStorage.getItem("role");

  return (
    <>
      <div className="dashpage-wrapper">
        <div className="container-fluid">
          <Navbar />
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>
            <div className="col-lg-10">
              <section className="main">
                <h4 className="dashpage-title">Your Collection</h4>
                <div className="row">
                  <CustomerDashboard />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collection;
