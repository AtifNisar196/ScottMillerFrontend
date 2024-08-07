import React from "react";
import "./blogs.scss";
import Header from "../../Components/CommonComponents/Header/Header";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import BlogsHome from "../../Components/BlogsHome/BlogsHome";
import SubscribeFormHome from "../../Components/SubscribeFormHome/SubscribeFormHome";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Blogs = () => {

    return (
        <div className="page-wrapper">
            <Header />
            <div className="about-banner-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about-banner">
                                <h3>Get The Book You Love</h3>
                                <h2>Blogs & Articles</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blogs-home">
                <BlogsHome />
            </div>
            <div className="subscribe-form sec-toper">
                <SubscribeFormHome />
            </div>
            <Footer />
        </div>
    );
};

export default Blogs;
