import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

axios.defaults.headers.common["Authorization"] =
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
    ? `Bearer ${JSON.parse(localStorage.getItem("user"))}`
    : "";

export default axiosClient;
