import "./addcoupon.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../../../Config/config";
import axios from "axios";

const AddCoupon = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("fixed");
  const [expiryDate, setExpiryDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [dateError, setDateError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable for submit button

  const handleDiscountChange = (e) => {
    const value = e.target.value;

    // Check if the entered value is a number and greater than or equal to 0
    if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0) {
      setDiscount(value);
    } else {
      // If the entered value is invalid, reset it to 0
      setDiscount("");
      toast.error("Discount cannot be negative or non-numeric");
    }
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setDateError(true);
      return;
    }

    setDateError(false);
    setExpiryDate(e.target.value);
  };

  const handelToSetCoupon = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable submit button
    try {
      const token = localStorage.getItem("token");
      const couponData = {
        name: name,
        code: code,
        type: type,
        discount: discount,
        // status: status,
        expiry_date: expiryDate,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseurl.BASE_URL}api/admin/coupons/store`,
        JSON.stringify(couponData),
        config
      );
      if (response.data.status) {
        toast.success("Add Coupon Successfully!!");
        setTimeout(() => {
          nav("/coupon");
        }, 3000);
      } else {
        toast.error("Add Coupon failed:");
        setIsSubmitting(false); // Re-enable submit button
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage =
          error.response.data.message ||
          "Internal Server Error. Please try again later.";
        
        toast.error(errorMessage);
        setIsSubmitting(false); // Re-enable submit button
      } else {
        const genericError = "Error fetch coupon";
        
        toast.error(genericError);
        setIsSubmitting(false); // Re-enable submit button
      }
      setIsSubmitting(false); // Re-enable submit button
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
              <h4 className="dashpage-title">Add New Coupon</h4>
              <form onSubmit={handelToSetCoupon}>
                <div className="card add-product-field">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Coupon Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Coupon Name"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="">Coupon Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Code"
                          required
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </div>

                      {/* <div className="col-md-4 mb-4">
                        <label htmlFor="">Coupon Type</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Coupon Type"
                          required
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                        />
                      </div> */}

                      <div className="col-md-4 mb-4">
                        <label htmlFor="couponDiscount">Coupon Discount</label>
                        <input
                          type="number" // Ensure the input type is number for numeric input
                          id="couponDiscount"
                          className="form-control"
                          placeholder="Coupon Discount"
                          required
                          value={discount}
                          onChange={handleDiscountChange}
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label htmlFor="expiryDate">Coupon Expiry Date</label>
                        <input
                          type="date"
                          id="expiryDate"
                          className={`form-control ${
                            dateError ? "is-invalid" : ""
                          }`}
                          placeholder="Expiry Date"
                          required
                          value={expiryDate}
                          onChange={handleDateChange}
                        />
                        {dateError && (
                          <div className="invalid-feedback">
                            Please Enter a Upcomming Date
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-2 mt-3">
                        <input type="submit" disabled={isSubmitting} />
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

export default AddCoupon;
