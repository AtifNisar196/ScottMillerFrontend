import React from "react";
import "./subscribers.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseurl from "../../../Config/config"

const Subscribers = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/email-subscribers/getAll`,
          config
        );
        setSubscribersData(response.data.message);
        console.log("Data=>>>>>>>", response.data.message);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubscribers();
  }, []);

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
              <h4 className="dashpage-title">Subscribers</h4>
              <div className="btn-right"></div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribersData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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

export default Subscribers;
