import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useLogout } from "../hooks/useLogout";

const BASE_URL = "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const response = await post("/auth/refresh");
        if (response.status === 200) {
          return axios(error.config);
        } else {
          useLogout();
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.get(url, config);
};

export const deleteRequest = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.delete(url, config);
};

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.put(url, data, config);
};

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return apiClient.post(url, data, config);
};
