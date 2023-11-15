import { AxiosInstance } from "axios";
import { BaseRest } from "../base";
import { AuthRequest, AuthResponse } from "./types";

export class AuthRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public login(data: AuthRequest) {
    return this.post<AuthResponse>("/auth/login", data);
  }

  public registration(data: AuthRequest) {
    return this.post<AuthResponse>("/auth/registration", data);
  }

  public logout() {
    return this.post("/auth/logout");
  }

  public refresh() {
    return this.get<AuthResponse>("/auth/refresh", { withCredentials: true });
  }
}
