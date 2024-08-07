import React, { useState, useEffect } from "react";
import "./login.scss";
import loginbook from "../../assets/images/login-book.png";
import google from "../../assets/images/google-img.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/authAction";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const authError = useSelector((state) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(login(formData, navigate));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const setLogoutTimer = (duration) => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("role");
      navigate("/login");
    }, duration);
  };

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry && new Date().getTime() > tokenExpiry) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("role");
      navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (authSuccess) {
  //     toast.error(authSuccess);
  //   }
  // }, [authSuccess]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-8">
            <div className="login-img">
              <img src={loginbook} alt="" className="float" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="login-form">
              <h2>Login to your account</h2>
              {authError && (
                <>
                  <p style={{ color: "red" }}>{authError}</p>
                </>
              )}

              <form onSubmit={onSubmit}>
                <div className="form-group row">
                  <label for="input2" className="col-sm-12 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChange}
                      id="input2"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="input3" className="col-sm-12 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-12">
                    <div className="pass-wrap">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                      <i
                        onClick={toggleShowPassword}
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } password-icon`}
                      ></i>
                    </div>
                  </div>
                </div>

                <button type="submit" className="login-btn">
                  {loading && (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  Login
                </button>
                {/* <p>or</p>
                <button className="login-with-google">
                  <img src={google} alt="" />
                  <p>Sign Up with Google</p>
                </button> */}
              </form>
            </div>
            <div className="sign-in-wrap">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
