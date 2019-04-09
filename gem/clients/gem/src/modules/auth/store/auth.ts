import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import AuthService from "../services/auth";
import { Credentials, User, AuthResponse } from "../types";

@Module({ namespaced: true, dynamic: true, name: "auth", store })
export default class AuthModule extends VuexModule {
  public token: string = localStorage.getItem("token") || "";
  public message: string = "";
  public user: User = { name: "" };

  private service = new AuthService();

  @Action public async login({ username, password }: Credentials) {
    try {
      // const token = await service.login(username, password);
      if (username === "admin" && password === "password") {
        this.authenticationSucceeded({ token: "123", user: { name: "admin" } });
      } else {
        this.authenticationFailed("Wrong login/password");
      }
    } catch {
      this.authenticationFailed("Unknown error");
    }
  }

  @Mutation private authenticationSucceeded(result: AuthResponse) {
    this.token = result.token;
    this.user = result.user;
    localStorage.setItem("token", result.token);
  }

  @Mutation private authenticationFailed(message: string) {
    this.token = "";
    this.message = message;
  }

  get isAuthenticated(): boolean {
    return this.token !== "";
  }
}

export const Auth = getModule(AuthModule);
