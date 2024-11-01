import axios, { AxiosError, AxiosResponse } from "axios";
import { showToast, _getToken, _clearData } from "../utils";
import { IPostProps } from "../vite-env";

const apiResource = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const customHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": `${baseURL}`,
  };


  const service = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers:  customHeaders,
    timeout: 10000
  });

  service.interceptors.request.use((config) => {
    const token = _getToken();
    if (token) {
      config.headers["Authorization"] =  token;
    }
    return config;
  });

  const handleErrorResponse = (error: AxiosError) => {
    if (!error.response) {
      showToast("Something went wrong", "error");
      return Promise.reject(new Error("Network Error"));
    }

    const errorData = error.response.data;
    const status = error.response.status;

    switch (status) {
      case 404:
        showToast("Resource not found", "error");
        break;
      case 401:
        _clearData({ pushToLogin: true });
        break;
      case 500:
        showToast("Server Error", "error");
        break;
      default:
        { const errorMessage = "Something went wrong";
        showToast(errorMessage, "error"); }
    }
    
    return Promise.reject(errorData);
  };

  service.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    handleErrorResponse
  );

  return {
    get: async (url: string) => {
      try {
        const data = service.get(url);
        const exactData = await Promise.resolve(data);
        return exactData.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    post: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    delete: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.delete(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const apiService = apiResource();
