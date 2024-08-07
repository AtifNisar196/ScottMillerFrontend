import React, { useState } from "react";
import axios from "axios";
import "./button.scss";
import { Link, useNavigate } from "react-router-dom";
import baseurl from "../../../Config/config"

const Button = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `${baseurl.BASE_URL}api/auth/logout`,
        null,
        config
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("tokenExpiry");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
      window.location.reload();
      navigate("/");
    }
  };
  return (
    <>
      <div className="navigation" onClick={handleLogout}>
        <span className="button">
          <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" />
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="logout">LOGOUT</div>
          )}
        </span>
      </div>
    </>
  );
};

export default Button;
