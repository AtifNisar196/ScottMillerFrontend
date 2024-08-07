import React from "react";
import "./dashblog.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import baseurl from "../../../Config/config";

const DashBlog = () => {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseurl.BASE_URL}api/admin/blog/getAll`,
          config
        );
        setData(response.data.data);
        console.log("Data", response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer${token}`,
        },
      };
      const response = await axios.get(
        `${baseurl.BASE_URL}api/admin/blog/delete/${id}`,
        config
      );
      if (response.data.status) {
        toast.success("Delete Blog Successfully!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 300); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <>
      <div className="dashpage-wrapper">
        <div className="container-fluid">
          <Navbar />
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>
            <div className="col-lg-10 myblog">
              <h4 className="dashpage-title">Blog</h4>
              <div className="btn-right">
                <Link
                  to="/addblog/new"
                  style={{ textDecoration: "none", width: "120px" }}
                  className="add-btn"
                >
                  Add New Blog
                </Link>
              </div>
              <div className="btn-right"></div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="80px">Blog ID</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Sumamry</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>
                          <img src={item.featured_image} alt="" />
                        </td>
                        <td>
                          <p>{item.summary}</p>
                        </td>
                        <td>
                          <p>{item.description}</p>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id)}>
                            <DeleteForeverIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <ToastContainer />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashBlog;
