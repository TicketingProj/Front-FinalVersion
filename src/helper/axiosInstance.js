import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "https://camp-api.roocket.ir/api/v1",
  baseURL: "http://optivas.ir",
  withCredentials: true,
});
export default axiosInstance;
