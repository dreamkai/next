import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

type ApiResponse<T = unknown> = {
  code?: number;
  message?: string;
  error?: string;
  data?: T;
};

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

request.interceptors.response.use(
  // @ts-expect-error 项目约定：统一返回 response.data
  (response) => {
    const res = response.data as ApiResponse;

    if (typeof res?.code === "number" && res.code !== 0) {
      window.alert(res.message ?? "请求失败");
      return Promise.reject(res);
    }

    return res;
  },
  (error: AxiosError<ApiResponse>) => {
    const message = error.response?.data?.message ?? error.response?.data?.error ?? "请求错误";
    window.alert(message);
    return Promise.reject(error);
  },
);

export default request;

