import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tailorshop-1.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;