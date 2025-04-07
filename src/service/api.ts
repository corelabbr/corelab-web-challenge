import axios from "axios"

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:3333", // Set your base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
