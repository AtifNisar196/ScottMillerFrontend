import React from "react";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import "./contact.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../Config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, Setmessage] = useState("");
  const nav = useNavigate();

  const handelToSetContact = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const contactData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseurl.BASE_URL}api/frontend/contact/store`,
        contactData,
        config
      );
      console.log("setee", response.data.status);
      if (response.data.status) {
        toast.success("Message Sent Successfully!");
        setEmail("");
        setName("");
        Setmessage("");
        setPhone("");
      } else {
        toast.error("Message Sent failed!");
      }
    } catch (error) {
      toast.error("Required All fields.");
    }
  };
  return (
    <div className="page-wrapper">
      <Header />
      <div className="about-banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-banner">
                <h3>Get The Book You Love</h3>
                <h2>Scott L Miller Books</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="contact-form-wrapper"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="container">
          <span className="big-circle float"></span>
          <img src="img/shape.png" className="square" alt="" />
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Let's get in touch</h3>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                dolorum adipisci recusandae praesentium dicta!
              </p>

              <div className="info">
                <div className="information">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <p>124 La Gorce Dr Chesterfield, MO 63017</p>
                </div>
                <div className="information">
                  <i className="fa fa-envelope"></i>
                  <p>
                    <a href="mailto: smiller0224@aol.com">
                      {" "}
                      smiller0224@aol.com
                    </a>
                  </p>
                </div>
                <div className="information">
                  <i className="fa fa-phone"></i>
                  <p>
                    <a href="tel: 636-579-2233">123-456-789</a>
                  </p>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/scottmillerauthor/"
                    target="_blank"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="https://x.com/scottm_author" target="_blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/scottmiller_author/"
                    target="_blank"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>

              <form onSubmit={handelToSetContact}>
                <h3 className="title">Contact us</h3>
                <div className="input-container">
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="input-container">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input-container">
                  <input
                    type="tel"
                    className="input"
                    placeholder="Phone"
                    value={phone}
                    required
                    pattern="[0-9]{10}" 
                    onChange={(e) => {
                      setPhone(e.target.value);
                      e.target.setCustomValidity(""); 
                    }}
                    onInvalid={(e) => {
                      e.target.setCustomValidity(
                        "Please enter a valid 10-digit phone number."
                      );
                    }}
                  />
                </div>
                <div className="input-container">
                  <textarea
                    type="text"
                    className="input"
                    placeholder="Message"
                    value={message}
                    required
                    onChange={(e) => {
                      Setmessage(e.target.value);
                    }}
                  />
                </div>
                <input type="submit" value="Send" className="btn" />
              </form>

              <div className="row">
                <div className="col-md-2 mb-2 mt-3">
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-sec-wrapper">
        <section className="map_sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="map_inner">
                  <h4>Find Us on Google Map</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tempore quo beatae quasi assumenda, expedita aliquam minima
                    tenetur maiores neque incidunt repellat aut voluptas hic
                    dolorem sequi ab porro, quia error.
                  </p>
                  <div className="map_bind">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317893.9737282887!2d-0.11951900000000001!3d51.503186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2sus!4v1715706311117!5m2!1sen!2sus"
                      width="100%"
                      height="450"
                      frameborder="0"
                      style={{ border: "0" }}
                      allowfullscreen=""
                      aria-hidden="false"
                      tabindex="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
