import React from "react";
import "./discovernews.scss";

const DiscoverNews = () => {
  const News = [
    {
      icon: "fa fa-university",
      title: "How to write a cover letter that will get you noticed",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.",
    },
    {
        icon: "fa fa-certificate",
        title: "How to write a cover letter that will get you noticed",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.",
      },
    {
      icon: "fa fa-star",
      title: "How to write a cover letter that will get you noticed",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.",
    },
    {
      icon: "fa fa-list-alt",
      title: "How to write a cover letter that will get you noticed",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.",
    },
  ];
  return (
    <>
      <div className="discover-news-wrapper ">
        <div className="discover-news">
          <h4>Discover News</h4>
          {News.map((item, index) => {
            return (
              <div className="discover-news-box">
                <div className="discover-news-box-wrap">
                  <div className="discover-news-box-content">
                    <div className="discover-news-box-icon">
                      <i className={item.icon} aria-hidden="true"></i>
                    </div>
                    <div className="discover-content-wrap">
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                  <div className="discover-news-box-arr">
                    <i className="fa fa-arrows-h" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="discover-news-box">
            <div className="discover-news-box-wrap">
              <div className="discover-news-box-content">
                <div className="discover-news-box-icon">
                  <i className="fa fa-university" aria-hidden="true"></i>
                </div>
                <div className="discover-content-wrap">
                  <h5>How to write a cover letter that will get you noticed</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sit amet lacus enim.
                  </p>
                </div>
              </div>
              <div className="discover-news-box-arr">
                <i className="fa fa-arrows-h" aria-hidden="true"></i>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DiscoverNews;
