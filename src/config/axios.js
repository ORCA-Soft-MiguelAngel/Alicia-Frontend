import axios from "axios";

const URL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL_DEV : process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : ""

const axiosClient = axios.create({
  baseURL: URL ,
  headers: {
    Authorization:
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
        ? `Bearer ${JSON.parse(localStorage.getItem("user"))}`
        : "",
    Test: "header test",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  //withCredentials: true
});

export default axiosClient;
