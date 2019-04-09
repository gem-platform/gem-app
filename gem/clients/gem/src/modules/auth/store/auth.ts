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

const service = new AuthService();

@Module({ namespaced: true, dynamic: true, name: "auth/data", store })
export default class AuthModule extends VuexModule {
  public token: string = localStorage.getItem("token") || "";
  public message: string = "";
  public user: User = { name: "" };

  @Action public async login({ username, password }: Credentials) {
    try {
      // const token = await service.login(username, password);
      if (username === "admin" && password === "password") {
        this.authenticationSucceeded({ token: "123", user: { name: "admin" } });
      } else {
        this.setMessage("Wrong login/password");
        this.authenticationFailed();
      }
    } catch {
      this.authenticationFailed();
    }
  }

  @Mutation private authenticationSucceeded(result: AuthResponse) {
    console.log(result);
    this.token = result.token;
    this.user = result.user;
    localStorage.setItem("token", result.token);
  }

  @Mutation private authenticationFailed() {
    this.token = "";
  }

  @Mutation setMessage(msg: string) {
    this.message = msg;
  }

  get isAuthenticated(): boolean {
    return this.token !== "";
  }
}

export const Auth = getModule(AuthModule);
