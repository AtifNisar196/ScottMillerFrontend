import React, { useState, useEffect } from "react";
import "./signup.scss";
import signupbook from "../../assets/images/signup-book.png";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/actions/authAction";
import google from "../../assets/images/google-img.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const authError = useSelector((state) => state.auth.error);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { name, email, password, password_confirmation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (name.length < 3 || name.length > 50) {
      toast.error("Name must be between 3 and 50 characters long.");
      setLoading(false);

      return;
    }

    if (email.length < 5 || email.length > 20) {
      toast.error("Email must be between 5 and 20 characters long.");
      setLoading(false);

      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);

      return;
    }

    if (password !== password_confirmation) {
      toast.error("Passwords do not match.");
      setLoading(false);

      return;
    }

    if (password !== password_confirmation) {
      toast.error("Passwords do not match");
    } else {
      try {
        setLoading(true);
        await dispatch(signup(formData, navigate));
      } catch (error) {
        console.error("signup error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-wrapper">
      <ToastContainer />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 hide-img">
            <div className="signup-head">
              <h3>Get Yourself Registered With</h3>
              <h2>Scott L Miller Books</h2>
            </div>
            <div className="signup-img">
              <img src={signupbook} alt="" className="float" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="signup-form">
              <h2>Create your account</h2>
              {authError && (
                <>
                  <p style={{ color: "red" }}>{authError}</p>
                </>
              )}
              <form onSubmit={onSubmit}>
                <div className="form-group row">
                  <label for="name" className="col-sm-12 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={onChange}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="email" className="col-sm-12 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={onChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="password" className="col-sm-12 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-12">
                    <div className="pass-wrap">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                      />
                      {
                        <i
                          onClick={toggleShowPassword}
                          className={`fa ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          } password-icon`}
                        ></i>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="password_confirmation"
                    className="col-sm-12 col-form-label"
                  >
                    Confirm Password
                  </label>
                  <div className="col-sm-12">
                    <div className="pass-wrap">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={password_confirmation}
                        onChange={onChange}
                        placeholder="Confirm Password"
                      />
                      {
                        <i
                          onClick={toggleShowConfirmPassword}
                          className={`fa ${
                            showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          } password-icon`}
                        ></i>
                      }
                    </div>
                  </div>
                </div>
                <div className="agree-terms">
                  <input type="checkbox" required />
                  <p>
                    I have read and agree to the{" "}
                    <Link to="#">Terms of Service</Link>
                  </p>
                </div>
                <button type="submit" className="signup-btn mt-5">
                  {loading && (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  Sign Up
                </button>
                {/* <p>or</p>
                <button className="signup-with-google">
                  <img src={google} alt="" />
                  <p>Sign Up with Google</p>
                </button> */}
              </form>
            </div>
            <div className="sign-in-wrap mt-3">
              <Link to="/login">Login In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
