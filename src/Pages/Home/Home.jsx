import React, { useState } from "react";
import Header from "../../Components/CommonComponents/Header/Header";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import AboutScott from "../../Components/AboutScott/AboutScott";
import ScottBestSelling from "../../Components/ScottBestSelling/ScottBestSelling";
import MitchAdam from "../../Components/MitchAdam/MitchAdam";
import GalleryHome from "../../Components/GalleryHome/GalleryHome";
import SubscribeFormHome from "../../Components/SubscribeFormHome/SubscribeFormHome";
import BlogsHome from "../../Components/BlogsHome/BlogsHome";
import Footer from "../../Components/CommonComponents/Footer/Footer";
import HomeTestimonials from "../../Components/HomeTestimonials/HomeTestimonials";
import BookModal from "../../Components/BookModal/BookModal";
import './home.scss';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="">
            <Header />
            <div className="banner">
                <HomeBanner />
            </div>
            <div className="home-about-section">
                <AboutScott />
            </div>
            <div className="scott-best-selling">
                <ScottBestSelling />
            </div>
            <div className="mitchadam-series">
                <MitchAdam />
            </div>
            <div className="testimonial">
                <HomeTestimonials />
            </div>
            <div className="gallery-home ">
                <GalleryHome />
            </div>
            <div className="subscribe-form sec-toper">
                <SubscribeFormHome />
            </div>
            <div className="blogs-home">
                <div className="blog">
                    <h4>Blogs & Article</h4>
                </div>
                <BlogsHome />
            </div>
            <Footer />
            <BookModal />
        </div>
    );
};

export default Home;
