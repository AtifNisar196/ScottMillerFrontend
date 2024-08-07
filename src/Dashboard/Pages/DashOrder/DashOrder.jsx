import React, { useState, useEffect } from "react";
import "./dashorder.scss";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import { Box, CircularProgress } from "@mui/material";
import baseurl from "../../../Config/config";

const DashOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/orders/getAll`,
          config
        );
        const items = response.data.data;
        setOrders(items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `${baseurl.BASE_URL}api/admin/orders/change/status/${orderId}`,
        { status: newStatus },
        config
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
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
              <h4 className="dashpage-title">Orders</h4>
              {/* {error ? (
                <div className="error-message">{error}</div>
              ) : ( */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Order Date & Time</th>
                      <th>Status</th>
                      <th>Total</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const date = new Date(order.created_at);
                      const formattedDate = date.toLocaleDateString();
                      const formattedTime = date.toLocaleTimeString();

                      return (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.name}</td>
                          <td>{order.address}</td>
                          <td>{order.city}</td>
                          <td>{order.country}</td>

                          <td>
                            {formattedDate} {formattedTime}
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>{order.total}</td>
                          {/* <td>
                                                        <button onClick={() => handleDelete(order.id)}>Delete</button>
                                                    </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashOrder;
