import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3200/api",
  baseURL: "https://evangadie-forum.onrender.com"
});

export default axiosInstance;
