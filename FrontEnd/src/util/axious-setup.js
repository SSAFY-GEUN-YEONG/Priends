import axios from "axios";

const http = axios.create({
  withCredentials: true,
});

http.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 수정 된 http 인스턴스를 export
export default http;
