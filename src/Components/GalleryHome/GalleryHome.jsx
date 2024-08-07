import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./galleryhome.scss";
import galler1 from "../../assets/images/man1.gif";
import galler2 from "../../assets/images/man2.gif";
import galler3 from "../../assets/images/man3.jpg";
import galler4 from "../../assets/images/man4.gif";
import galler5 from "../../assets/images/man5.gif";
// import galler6 from "../../assets/images/man6.gif";
import galler7 from "../../assets/images/man7.gif";
import galler8 from "../../assets/images/man8.gif";
import galler9 from "../../assets/images/man9.jpg";
import galler11 from "../../assets/images/man11.jpeg";
import galler12 from "../../assets/images/man12.jpeg";
import galler13 from "../../assets/images/man13.jpeg";
import galler14 from "../../assets/images/man14.jpeg";
import galler15 from "../../assets/images/man15.jpeg";
import galler16 from "../../assets/images/man16.jpeg";
import galler17 from "../../assets/images/man17.jpeg";
// import galler10 from "../../assets/images/man10.jpg";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const GalleryHome = () => {
    const GalleryImages = [
        {
            id: 1,
            image: galler1
        },
        {
            id: 2,
            image: galler2
        },
        {
            id: 3,
            image: galler3
        },
        {
            id: 4,
            image: galler4
        },
        {
            id: 5,
            image: galler5
        },
        // {
        //     id: 6,
        //     image: galler6
        // },
        {
            id: 7,
            image: galler7
        },
        {
            id: 8,
            image: galler8
        },
        {
            id: 9,
            image: galler9
        },
        {
            id: 10,
            image: galler11
        },
        {
            id: 11,
            image: galler12
        },
        {
            id: 12,
            image: galler13
        },
        {
            id: 13,
            image: galler14
        },
        {
            id: 14,
            image: galler15
        },
        {
            id: 15,
            image: galler16
        },
        {
            id: 16,
            image: galler17
        },
        // {
        //     id: 10,
        //     image: galler10
        // },
    ]
    return (
        <div className="galleryhome-wrapper mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="galleryhome-head">
                            <h4>Gallery</h4>
                            <h2>Memories We Have</h2>
                        </div>
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            rewind={true}
                            navigation={true}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={false}
                            modules={[EffectCoverflow, Navigation]}
                            initialSlide={3} // Set the initial slide to the middle slide
                            className="mySwiper"
                        >
                            {
                                GalleryImages.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index} >
                                            <img src={item.image} />
                                        </SwiperSlide>
                                    );
                                })
                            }

                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryHome;
