import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import bannerside from "../../assets/images/banner-side.png";

import leftArrowImage from "../../assets/images/right-arrow.png";
import rightArrowImage from "../../assets/images/right-arrow.png";
// import rightArrowImage from "../../assets/right-arrow.png";
import "./homebanner.scss";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="homebanner-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              rewind={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="slide-wrap">
                  <div
                    className="content-wrapper "
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <h1>
                      <span>Suspense, Thrill, and Mystery in the World of</span>
                      Scott L. Miller.
                    </h1>
                    <p>
                      Dive into each novel, where mystery takes center stage.
                      {/* <span>April 2024</span> */}
                    </p>
                    <div className="btn-wrap">
                      <Link to="/books" className="btn">
                        Book Your Copy Now
                      </Link>
                    </div>
                  </div>
                  <div
                    className="side-img "
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <img src={bannerside} alt="" className="float" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-wrap">
                  <div className="content-wrapper" data-aos="fade-up">
                    <h1>
                      <span>A Novel by</span>
                      Scott Miller
                    </h1>
                    <p>
                      Launching in
                      <span>April 2024</span>
                    </p>
                    <div className="btn-wrap">
                      <Link to="/books" className="btn">
                        Book Your Copy Now
                      </Link>
                    </div>
                  </div>
                  <div className="side-img " data-aos="fade-up">
                    <img src={bannerside} alt="" className="float" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-wrap">
                  <div className="content-wrapper">
                    <h1>
                      <span>A Novel by</span>
                      Scott Miller
                    </h1>
                    <p>
                      Launching in
                      <span>April 2024</span>
                    </p>
                    <div className="btn-wrap">
                      <Link to="/books" className="btn">
                        Book Your Copy Now
                      </Link>
                    </div>
                  </div>
                  <div className="side-img ">
                    <img src={bannerside} alt="" className="float" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-wrap">
                  <div className="content-wrapper">
                    <h1>
                      <span>A Novel by</span>
                      Scott Miller
                    </h1>
                    <p>
                      Launching in
                      <span>April 2024</span>
                    </p>
                    <div className="btn-wrap">
                      <Link to="/books" className="btn">
                        Book Your Copy Now
                      </Link>
                    </div>
                  </div>
                  <div className="side-img ">
                    <img src={bannerside} alt="" className="float" />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
