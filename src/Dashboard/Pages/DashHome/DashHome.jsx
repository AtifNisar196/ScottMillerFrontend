import React from "react";
import "./dashhome.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import DashHomeBox from "../../Components/PageComponents/DashHomeBox/DashHomeBox";
import LatestNews from "../../Components/PageComponents/LatestNews/LatestNews";
import DiscoverNews from "../../Components/PageComponents/DiscoverNews/DiscoverNews";
import Footer from "../../Components/Footer/Footer";
import Datatable from "../../Components/PageComponents/DataTable/DataTable";
import ProductTransactionTable from "../../Components/PageComponents/ProductTransactionTable/ProductTransactionTable";
import CustomerDashboard from "../../Components/CustomerDashboard/CustomerDashboard";

const DashHome = () => {
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
              {verifyRole == "admin" ? (
                <>
                  <section className="main">
                    <h4 className="dashpage-title">Dashboard</h4>
                    <div className="row">
                      <DashHomeBox />
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="main">
                    <h4 className="dashpage-title">Your Collection</h4>
                    <div className="row">
                      <CustomerDashboard />
                    </div>
                  </section>
                </>
              )}
              <div className="row my-4">
                {/* <DiscoverNews/> */}
                {/* <div className="bottom">
                <h4 className="dashpage-title">last Transaction</h4>
                  <ProductTransactionTable />
                </div> */}
              </div>
            </div>
            {/* <div className="col-lg-3">
              <LatestNews />
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashHome;
