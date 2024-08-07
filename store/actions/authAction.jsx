import toast from "react-hot-toast";
import axios from "axios";
import baseurl from "../../src/Config/config";

// Login function
export const login = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseurl.BASE_URL}api/auth/login`, userData);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    if (res.data.status === true) {
      // toast.success("Login successful!");
      localStorage.setItem("token", res.data.token.access_token);
      localStorage.setItem("role", res.data.data.user_role);
      const role = res.data.data.user_role;
      window.dispatchEvent(new Event("storage"));

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    dispatch({
      type: "LOGIN_FAIL",
      payload: err.response?.data?.message || "Login failed",
    });
  }
};

// Signup function
export const signup = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${baseurl.BASE_URL}api/auth/register`,
      userData
    );
    dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
    if (res.data.status === true) {
      toast.success("Signup successful!");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      toast.error(res.data.message);
      dispatch({ type: "SIGNUP_FAIL", payload: res.data.message });
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
    dispatch({
      type: "SIGNUP_FAIL",
      payload: err.response?.data?.message || "Signup failed",
    });
  }
};
