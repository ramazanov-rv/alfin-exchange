import axios from "axios";

const getBaseURL = () => {
  const envURL = process.env.REACT_APP_API_BASE_URL;
  if (envURL && !envURL.endsWith("/api/v1")) {
    const cleanURL = envURL.replace(/\/$/, "");
    return `${cleanURL}/api/v1`;
  }
  return envURL;
};

export const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 503) {
      if (window.location.pathname !== "/maintenance") {
        window.location.href = "/maintenance";
      }
    }
    return Promise.reject(error);
  }
);
