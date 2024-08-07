import React from "react";
import "./about.scss";
import aboutbannerimg from "../../assets/images/about-banner-book.png";
import middlesec from "../../assets/images/bef-book.png";
import scottabout from "../../assets/images/scott-ab.png";
import Header from "../../Components/CommonComponents/Header/Header";
import ScottBestSelling from "../../Components/ScottBestSelling/ScottBestSelling";
import GalleryHome from "../../Components/GalleryHome/GalleryHome";
import HomeTestimonials from "../../Components/HomeTestimonials/HomeTestimonials";
import SubscribeFormHome from "../../Components/SubscribeFormHome/SubscribeFormHome";
import BlogsHome from "../../Components/BlogsHome/BlogsHome";
import Footer from "../../Components/CommonComponents/Footer/Footer";

const About = () => {
    return (
        <div className="page-wrapper">
            <Header />
            <div className="about-banner-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about-banner">
                                <h3>About The Author</h3>
                                <h2>Scott Miller</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <div className="dark-wrap" data-aos="zoom-in" data-aos-duration="1000">
                                <p>
                                    Scott L. Miller has earned his Master’s degree in social work
                                    and boasts extensive experience as a psychiatric and medical
                                    LCSW in both public and private settings.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="about-img">
                                <img src={aboutbannerimg} alt="" className="float" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="middle-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="middle-sec-img">
                                <img src={middlesec} alt="" className="float" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="middle-sec-content"  data-aos-duration="1000">
                                <p className="first">
                                    He is an avid reader of fiction & literature and most genres.
                                    He studied fiction writing under the late John Gardner and
                                    Jeremiah Healy. He enjoys writing in first person, narrator.
                                </p>
                                <p>
                                    His first three novels comprise part of the Mitchell Adams
                                    series, featuring a social worker in private practice in St.
                                    Louis. Prodigal, releasing on 3-19-24, is fiction & literature
                                    with elements of suspense and mystery. The fourth installment
                                    in his series, Boundless, will release later in 2024, as will
                                    his sixth novel titled The Nostradamus Society, also fiction &
                                    literature with elements of suspense. He resides in
                                    Chesterfield, MO, a suburb of St. Louis
                                </p>
                                <p>
                                    Before authoring six novels, Scott L. Miller worked with a
                                    diverse clientele as a licensed clinical social worker in
                                    psychiatric and medical settings. He loves playing group
                                    trivia with his friends, enjoys card games, horseracing,
                                    singing along with music, critiquing movies, cooking, and
                                    changing song lyrics for laughs. He loves walking with his two
                                    beagles, Romeo and Juliet, and wishes he had room at home for
                                    his other favorite animals, horses and whales. He has one
                                    daughter and a great group of friends.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="middle-sec-scott">
                                <img src={scottabout} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="scott-best-selling">
                <ScottBestSelling />
            </section>
            <section className="gallery-about">
                <GalleryHome />
            </section>
            <section className="about-testimonial sec-toper">
                <HomeTestimonials />
            </section>
            <section className="blogs-about">
                <div className="blog" >
                    <h4>Blogs & Article</h4>
                </div>
                <BlogsHome />
            </section>
            <section className="subscribe-form-about ">
                <SubscribeFormHome />
            </section>
            <Footer />
        </div>
    );
};

export default About;
