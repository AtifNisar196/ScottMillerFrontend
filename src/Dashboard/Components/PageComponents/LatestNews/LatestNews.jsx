import React from "react";
import "./latestnews.scss";
import { Link } from "react-router-dom";

const LatestNews = () => {
    const activities=[
        {
            icon:"fa fa-user",
            text:"You started the recruiting process with the",
            link:"Lawrence Technological University",
            days:"27 days ago"
        },
        {
            icon:"fa fa-user",
            text:"You started the recruiting process with the",
            link:"Lawrence Technological University",
            days:"27 days ago"
        },
        {
            icon:"fa fa-user",
            text:"You started the recruiting process with the",
            link:"Lawrence Technological University",
            days:"27 days ago"
        },

    ]
  return (
    <>
      <div className="dashhome-right">
        <div className="dashhome-right-wrap">
          <h4>Recent Activities</h4>
          <div className="recent-activities">
            {activities.map((activity,index)=>(
                <div className="activity-wrapper" key={index}>
                <div className="activity-icon">
                  <i className={activity.icon}></i>
                </div>
                <p>
                  {activity.text}
                  <Link to="/dashboard">{activity.link}</Link>
                  {activity.days}
                </p>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
