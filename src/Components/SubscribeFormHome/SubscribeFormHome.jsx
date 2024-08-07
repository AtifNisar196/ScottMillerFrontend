import React from "react";
import "./subscribeformhome.scss";
import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseurl from "../../Config/config";
import { useNavigate } from "react-router-dom";

const SubscribeFormHome = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Step 1: Add state for name

  const handelToSetSubscribe = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const contactData = {
        name: name, // Step 3: Include the name in contactData
        email: email,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/email-subscribers/store`,
        JSON.stringify(contactData),
        config
      );
      if (response.data.status) {
        toast.success("subscribed successfully!");
        setEmail("");
      } else {
        toast.error("Message Sent failed!");
      }
    } catch (error) {
      toast.error("Email already taken! ");
    }
  };

  return (
    <div
      className="subscribeform-wrapper"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="subscribeform-head">
              <h2>Subscribe To Get Exclusive Offers And News</h2>
            </div>
            <div className="subscribeform-content">
              <p>
                Subscribe to Scott Miller’s newsletter and receive the latest
                news, book updates, exclusive content, giveaways, and more!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-5">
            <div className="form-wrapper">
              <form onSubmit={handelToSetSubscribe}>
                <input
                  type="text"
                  hidden
                  className="input"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
                {/* Step 2: Add input for name */}
                <input
                  type="email"
                  className="input"
                  required
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="col-lg-4"></div>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default SubscribeFormHome;
