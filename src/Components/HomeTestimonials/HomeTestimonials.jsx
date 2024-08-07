import React, { useRef, useState } from "react";
import "./hometestimonials.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import testiomanialpic from "../../assets/images/testimonial-person.png";

const HomeTestimonials = () => {
  return (
    <div className="testimonials-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="testimonial-head">
              <h4>Testimonials</h4>
              <h2>What Readers Have To Say</h2>
              <p>
                Scott L. Miller has delivered captivating and thrilling novels
                through his craft. Here is what some of his readers have to say
                about his work.
              </p>
            </div>
          </div>
        </div>
        <Swiper
         rewind={true}
         navigation={true}
         modules={[Navigation]}
         className="mySwiper"
        >
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper"  data-aos-duration="1000">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content"  data-aos-duration="1000">
                <div className="testimonial-text">
                  <p>
                    “Intriguing and captivating, The Nostradamus Society pulls you into a world of mystery and secrets.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Catherine Sundberg</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                    “Boundless is a compelling read, filled with suspense and unexpected twists. Highly recommended for mystery lovers.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Sean Douglas</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  Unputdownable! Prodigal creates a gripping tale of intrigue and dark secrets.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Timothy McWilliams</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  Unputdownable! Prodigal creates a gripping tale of intrigue and dark secrets.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Timothy McWilliams</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  "A masterpiece of suspense and drama. Interrogation keeps you hooked till the end.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Barbara Hawthorn</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  " Absolutely thrilling! Scott Miller knows how to put readers on a rollercoaster of emotions and surprises.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Geena Miller</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  "The Nostradamus Society is an enthralling tale of mystery and intrigue that kept me hooked from beginning to end.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Emily Thomas</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  "A gripping narrative that seamlessly blends suspense, drama, and rich character development.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Victor Schieffer</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  "A captivating read. Prodigal explores deep themes with vivid storytelling and engaging prose.”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Robert Lanford</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-wrap">
              <div className="testimonial-pic">
                <div className="person-pic-wrapper">
                  <img src={testiomanialpic} alt="person" />
                </div>
              </div>
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>
                  "Interrogation is an unforgettable journey through a beautifully crafted world filled with suspense and excitement. ”
                  </p>
                </div>
                <div className="testimonial-name">
                  <h4>Martha Jones</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* <div className="testimonial-wrap">
          <div className="testimonial-pic">
            <div className="person-pic-wrapper">
              <img src={testiomanialpic} alt="person" />
            </div>
          </div>
          <div className="testimonial-content">
            <div className="testimonial-text">
              <p>
                “Scott L. Miller has delivered captivating and thrilling novels
                through his craft. Here is what some of his readers have to say
                about his work.”
              </p>
            </div>
            <div className="testimonial-name">
              <h4>John Doe</h4>
              <p>CEO, Company Name</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomeTestimonials;
