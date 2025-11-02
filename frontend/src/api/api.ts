import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // send cookies (refresh token)
});

// attach access token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// response interceptor to refresh token on 401
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response && err.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = await API.post("/auth/refresh"); // cookie sent automatically
        const newToken = refresh.data.token;
        localStorage.setItem("token", newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return API(original);
      } catch (refreshErr) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default API;
