import React, { useState, useEffect } from "react";
import "./singleblog.scss";

import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import baseurl from "../../Config/config";
import { ToastContainer, toast } from "react-toastify";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBLog = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/blog/getById/${id}`,
          config
        );
        console.log(response.data);
        setBlog(response.data.data);
        console.log("data", response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchBLog();
  }, [id]);

  return (
    <>
      <Header />
      <ToastContainer />
     
      <section className="single-blog">
        <div className="container">
          <h5 className="blogname">{blog.title}</h5>
          <div className="singleblog-content">
            <div className="cart-img">
              <img src={blog.featured_image} alt="" />
            </div>
            <div className="single-product">
              {/* <h6>Best Seller</h6> */}
              <h5>{blog.title}</h5>
              <div className="description">
                <h3>Summary</h3>
                <p>{blog.summary}</p>
              </div>
              <div className="description">
                <h3>Description</h3>
                <p>{blog.description}</p>
              </div>
             
            </div>
          </div>
        </div>
      </section>

      <section className="sec-toper">
        <Footer />
      </section>
    </>
  );
};

export default SingleBlog;
