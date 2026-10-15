import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { authStorage } from "../types/storage";

// Client-side environment variables in Next.js MUST start with NEXT_PUBLIC_
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3300";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Attach authentication token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = authStorage.getToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Centralized error handling
    this.client.interceptors.response.use(
      (response) => response,

      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 && typeof window !== "undefined") {
            authStorage.removeToken();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  get axios(): AxiosInstance {
    return this.client;
  }
}

export const api = new ApiClient();