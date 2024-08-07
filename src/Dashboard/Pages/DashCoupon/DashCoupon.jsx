import React from "react";
import "./dashcoupon.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../../Config/config"

const DashCoupon = ({ item }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/coupons/getAll`,
          config
        );
        setData(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const currentItem = data.find((item) => item.id === id);
      const newStatus = currentItem.status === 1 ? 0 : 1;

      const response = await axios.get(
        `${baseurl.BASE_URL}api/admin/coupons/toggleStatus/${id}`,
        config,
        {
          status: newStatus,
        }
      );

      console.log("Response:", response); // Log the response

      // Check if the API call was successful
      if (response.status === 200) {
        // Update the state with the new status

        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        toast.success("Coupon status has Changed");
      } else {
        // Handle error case
        console.error("Failed to toggle status");
      }
    } catch (error) {
      // Handle error case
      console.error("Error toggling status:", error);
    }
  };

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
              <h4 className="dashpage-title">Coupons</h4>
              <div className="btn-right">
                <Link
                  to="/addcoupon/new"
                  style={{ textDecoration: "none", width: "139px" }}
                  className="add-btn"
                >
                  Add New Coupon
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Discount</th>
                      <th>status</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.type}</td>
                        <td>{item.discount}</td>

                        <td>
                          <div
                            id={item.id}
                            className={`toggle-switch ${
                              item.status === 1 ? "active" : ""
                            }`}
                            onClick={() => {
                              handleToggle(item.id);
                            }}
                          >
                            <div className="switch-handle"></div>
                          </div>
                        </td>
                        <td>{item.expiry_date}</td>
                      </tr>
                    ))}
                    <ToastContainer />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashCoupon;
