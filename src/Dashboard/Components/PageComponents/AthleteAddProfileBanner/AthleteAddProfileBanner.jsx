import React from "react";
import bgimage from "../../../Assets/Images/athlete-profile-bg.png";

import "./athleteaddprofilebanner.scss"
import { Link } from "react-router-dom";

const AthleteAddProfileBanner = () => {
  const name = localStorage.getItem("name")

  return (
    <div className="athelete-add-profile-banner">
      <div className="athelete-profile-banner">
        <div className="athelete-profile-banner-img">
          <img src={bgimage} alt="" />
        </div>
        <div className="athelete-profile-banner-details">
          <div className="athelete-profile-banner-details-img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt=""
            />
          </div>
          <div className="athelete-profile-banner-details-text">
            <div className="shaded-text">
              <p className="text-center">Welcome back</p>
              <h4 className="text-center">{name}</h4>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteAddProfileBanner;
