import React from "react";
import "./orderhistory.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import CustomerOrderDashboard from "../../Components/CustomerOrderDashboard/CustomerOrderDashboard";

const OrderHistory = () => {
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
                <h4 className="dashpage-title">Your Order History</h4>
                <div className="row">
                  <CustomerOrderDashboard />
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

export default OrderHistory;
