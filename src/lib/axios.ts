import axios from "axios";
import { getCookie } from "cookies-next";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
    user_id: getCookie("user_id"),
  },
});
export default axiosClient;
