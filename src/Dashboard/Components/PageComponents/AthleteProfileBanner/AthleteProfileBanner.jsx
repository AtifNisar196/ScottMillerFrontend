import React from "react";
import bgimage from "../../../Assets/Images/athlete-profile-bg.png";

import "./athleteprofilebanner.scss";
import { Link } from "react-router-dom";

const AthleteProfileBanner = ({ prop }) => {
  const nammee= localStorage.getItem("name")
  return (
    <div>
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
              <p className="">Welcome back</p>
              <h4 className="">{nammee}</h4>
            </div>
            <div className="edit-profile-btn">
              <button>
                <Link to="">Edit Profile</Link>
                <i className="fa fa-arrows-h" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfileBanner;
