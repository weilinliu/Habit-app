import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import habitApi from "../api/habit";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
    case "signup":
      return {
        token: action.payload,
        errorMessage: ""
      };
    case "signout":
      return { token: null, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "remove_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({
        type: "signin",
        payload: token
      });
      navigate("Today");
    } else {
      navigate("Signin");
    }
  };
};

const clearErrorMessage = dispatch => {
  return () => {
    dispatch({ type: "remove_error" });
  };
};

const signup = dispatch => {
  return async ({ username, email, password }) => {
    try {
      // make api request to sign up with that email and password
      const response = await habitApi.post("/signup", {
        username,
        email,
        password
      });
      // if we sign up, modify our state
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signup",
        payload: response.data.token
      });
      navigate("Today");
    } catch (err) {
      // signing up fails
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up"
      });
    }
  };
};

const signin = dispatch => {
  return async ({ email, password }) => {
    // try to sign in
    try {
      const response = await habitApi.post("/signin", { email, password });
      // handle success by updating state
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "signin",
        payload: response.data.token
      });
      navigate("Today");
    } catch (err) {
      // handle failure by showing error message
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in"
      });
    }
  };
};

const signout = dispatch => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("Signin");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, signin, signout, signup, clearErrorMessage },
  { token: null, errorMessage: "" }
);
