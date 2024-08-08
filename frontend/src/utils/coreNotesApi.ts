import axios from "axios";
const apiUrl = import.meta.env.VITE_BACK_HOST;

export default axios.create({
  baseURL: `${apiUrl}`,
});
