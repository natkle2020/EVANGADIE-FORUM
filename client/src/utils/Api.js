import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance