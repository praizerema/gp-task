import axios, { AxiosResponse } from "axios";
import { showToast, _getToken, _clearData } from "../utils";
import { RefreshTokenApi } from "./api/auth.request";
import { IPostProps } from "../vite-env";

const apiResource = (customHeaders = {}) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": `${baseURL}`,
  };

  const fileHeaders = {
    ...customHeaders,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": `${baseURL}`,
  };

  const service = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: customHeaders ? fileHeaders : defaultHeaders,
  });

  service.interceptors.request.use((config) => {
    const token = _getToken();

    if (!token) return config;
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });

  service.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      const refreshToken = globalThis?.localStorage?.getItem("refresh_token");
      async function myFunction() {
        try {
          const data = { refresh_token: refreshToken };
          const response = await RefreshTokenApi(data);
          globalThis?.localStorage?.setItem(
            "token",
            response.data?.access_token
          );

          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          // return axios(error.config);
        } catch (error) {
          console.error(error); // Handle any errors that occur during the API call
          _clearData({ pushToLogin: true });
        }
      }
      if (error?.response === undefined)
        showToast("Something went wrong", "error");
      else {
        const errorData = error?.response?.data;
        const status = error?.response?.status;

        if (status === 404) {
          showToast("Resource not found", "error");
        }
        if (status === 401) {
          if (!refreshToken) return _clearData({ pushToLogin: true });

          return myFunction();
        }
        if (status === 500) {
          showToast("Server Error", "error");
        } else {
          const errorMessage =
            errorData?.detail || errorData.error || "Something went wrong";

          if (errorMessage) {
            showToast(errorMessage, "error");
          }
        }

        return Promise.reject(errorData);
      }
    }
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
        return resolvedData.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    patch: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData.data;
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
    },

    put: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

export { apiResource };
export const apiService = apiResource();
