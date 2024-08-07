import React from "react";
import "./aboutscott.scss";
import scottmiller from "../../assets/images/home-scott-img.png";
import { Link } from "react-router-dom";

const AboutScott = () => {
  return (
    <div className="aboutscott-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-4" >
            <div className="scott-miller-img" data-aos="flip-right" data-aos-duration="1000">
              <img src={scottmiller} alt="" />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="scott-miller-content" data-aos="flip-down" data-aos-duration="1500">
              <h4>About The Author</h4>
              <h2>Scott Miller</h2>
              <p>
                Scott L. Miller has earned his Master’s degree in social work
                and boasts extensive experience as a psychiatric and medical
                LCSW in both public and private settings.
              </p>
              <p className="highlight">
                He is an avid reader of fiction & literature and most genres. He
                studied fiction writing under the late John Gardner and Jeremiah
                Healy. He enjoys writing in first person, narrator.
              </p>
              <p>
                His first three novels comprise part of the Mitchell Adams
                series, featuring a social worker in private practice in St.
                Louis. Prodigal, releasing on 3-19-24, is fiction & literature
                with elements of suspense and mystery. The fourth installment in
                his series, Boundless, will release later in 2024, as will his
                sixth novel titled The Nostradamus Society, also fiction &
                literature with elements of suspense. He resides in
                Chesterfield, MO, a suburb of St. Louis
              </p>
              <div className="scott-btn-wrapper">
                <Link to="/about" className="btn">
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScott;
