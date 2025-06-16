import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://localhost:3200/api"  
});

export default axiosInstance