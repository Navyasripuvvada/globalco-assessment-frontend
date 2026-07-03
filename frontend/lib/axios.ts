import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://globalco-assessment-backend-eight.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
   
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

     
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;