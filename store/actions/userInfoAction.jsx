import axios from "axios";

export const getUserInfoRequest = () => ({
  type: "USERINFO_REQUEST"
});

export const getUserInfoSuccess = user => ({
  type: "USERINFO_SUCCESS",
  payload: user
});

export const getUserInfoFailure = error => ({
  type: "USERINFO_FAILURE",
  payload: error
});

export const getUserInfo = () => async (dispatch) => {
  dispatch(getUserInfoRequest());
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${baseurl.BASE_URL}api/auth/getLoggedIn`,
      {}, // No data in the request body
      config
    );

    dispatch(getUserInfoSuccess(response.data));
  } catch (error) {
    console.error("User info fetch error:", error);
    dispatch(getUserInfoFailure(error.message));
  }
};

