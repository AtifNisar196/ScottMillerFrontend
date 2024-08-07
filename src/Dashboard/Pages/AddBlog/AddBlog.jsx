import "./addblog.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../../Config/config";
import axios from "axios";

const AddBlog = () => {
  const nav = useNavigate();

  const maxLengthSummary = 200;
  const maxLengthDescription = 500;
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [featured_image, setFeaturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable for submit button

  const handelToSetBlog = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable submit button

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("description", description);
      formData.append("featured_image", featured_image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${baseurl.BASE_URL}api/admin/blog/store`,
        formData,
        config
      );

      if (response.data.status) {
        toast.success("Blog Add Successfully!!");
        setTimeout(() => {
          nav("/blog");
        }, 3000);
      } else {
        toast.error("Blog Add failed!");
        setIsSubmitting(false); // Re-enable submit button
      }
    } catch (error) {
      toast.error("All fields are required");
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFeaturedImage(file);
    } else {
      setFeaturedImage([]);
      e.target.value = null; // Clear the file input
      toast.error("Please select a valid image file");
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
            <div className="col-lg-10">
              <h4 className="dashpage-title">Add New Blog</h4>
              <form onSubmit={handelToSetBlog}>
                <div className="card add-product-field">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="">Blog Title </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                          required
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label htmlFor="blogImage">Blog Image</label>
                        <input
                          type="file"
                          className="form-control"
                          required
                          accept="image/*"
                          onChange={(e) => handleImageChange(e)}
                        />
                      </div>

                      <div className="col-md-12 mb-4">
                        <label htmlFor="blogSummary">Blog Summary</label>
                        <textarea
                          type="text"
                          id="blogSummary"
                          style={{ height: "150px" }}
                          className="form-control"
                          placeholder="Summary"
                          value={summary}
                          maxLength={maxLengthSummary}
                          required
                          onChange={(e) => {
                            setSummary(e.target.value);
                          }}
                        />
                        <small className="text-muted">
                          {summary.length}/{maxLengthSummary} characters
                        </small>
                      </div>

                      <div className="col-md-12 mb-4">
                        <label htmlFor="blogDescription">
                          Blog Description
                        </label>
                        <textarea
                          type="text"
                          id="blogDescription"
                          style={{ height: "200px" }}
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          maxLength={maxLengthDescription}
                          required
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                        <small className="text-muted">
                          {description.length}/{maxLengthDescription} characters
                        </small>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-2 mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
