import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  var bp = require("./Path");

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      bp.buildPath("api/users/login"),
      userCredential
    );

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
