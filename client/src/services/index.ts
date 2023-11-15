import axios from "axios";
import { NotesRest } from "./notes";
import { LabelRest } from "./labels";
import { AuthRest } from "./auth";

export class Rest {
  public readonly notes;
  public readonly labels;
  public readonly auth;

  private endpoint;

  public constructor() {
    this.endpoint = this.createAxios();

    this.notes = new NotesRest(this.endpoint);
    this.labels = new LabelRest(this.endpoint);
    this.auth = new AuthRest(this.endpoint);

    this.requestInterceptor();
    this.responseInterceptor();
  }

  private createAxios() {
    return axios.create({
      withCredentials: true,
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  private requestInterceptor() {
    this.endpoint.interceptors.request.use((config) => {
      config.headers.setAuthorization(
        `Bearer ${localStorage.getItem("token") || ""}`
      );
      return config;
    });
  }

  private responseInterceptor() {
    this.endpoint.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const initialRequest = error.config;
        if (
          error.response.status == 401 &&
          error.config &&
          !error.config._isRetry
        ) {
          try {
            initialRequest._isRetry = true;
            const response = await useRest().auth.refresh();
            localStorage.setItem("token", response.accessToken);
            return this.endpoint.request(initialRequest);
          } catch (error) {
            console.error(error);
          }
        }
        throw error;
      }
    );
  }
}

export const useRest = () => {
  const api = new Rest();
  return api;
};
