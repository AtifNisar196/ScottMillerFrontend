import React, { useState, useEffect } from "react";
import "./blogshome.scss";
import axios from "axios";
import baseurl from "../../Config/config";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";

const BlogsHome = () => {
  const [blogContent, setBlogContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async (page) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/frontend/blog?page=${page}`,
          config
        );
        setBlogContent(response.data.data.data);
        setTotalPages(response.data.data.last_page);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          const errorMessage =
            error.response.data.message ||
            "Internal Server Error. Please try again later.";
          toast.error(errorMessage);
        } else {
          const genericError = "Error";
          toast.error(genericError);
        }
      }
    };

    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="blogshome-wrapper">
      <div className="container-fluid">
        <div className="row">
          {blogContent.length == 0 ? (
            <div className="col-12">
              <div className="">
                <p>No Blogs has been uploaded yet</p>
              </div>
            </div>
          ) : (
            blogContent.map((blog, index) => (
              <div className="col-lg-3" key={index}>
                <div className="blog-card">
                  <div className="blog-card-img">
                    <img src={blog.featured_image} alt="" />
                  </div>
                  <div className="blog-card-head">
                    <h4>{blog.title}</h4>
                  </div>
                  <div className="blog-card-content">
                    <p>{blog.summary}</p>
                    <div className="btn-wrap">
                      <Link to={`/blogs/${blog.id}`} className="btn">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsHome;
