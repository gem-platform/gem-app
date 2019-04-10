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
  public user: User = {
    username: "",
    email: "",
    full_name: "",
    disabled: false
  };

  private service = new AuthService();

  @Action public async login({
    username,
    password
  }: Credentials): Promise<boolean> {
    try {
      const token = await this.service.login(username, password);
      this.authenticationSucceeded(token.access_token);
      return true;
    } catch (err) {
      this.authenticationFailed(err.response.data.detail || "Unknown error");
      return false;
    }
  }

  @Mutation logout() {
    this.token = "";
    localStorage.removeItem("token");
  }

  @Action public async loadUserData() {
    try {
      const data = await this.service.me();
      this.userDataLoaded(data);
    } catch {
      console.log("Not authorized");
    }
  }

  @Mutation private authenticationSucceeded(token: string) {
    this.token = token;
    this.message = "";
    localStorage.setItem("token", token);
  }

  @Mutation private authenticationFailed(message: string) {
    this.token = "";
    this.message = message;
    localStorage.removeItem("token");
  }

  @Mutation userDataLoaded(user: User) {
    this.user = user;
  }

  get isAuthenticated(): boolean {
    return this.token !== "";
  }

  get isUserLoaded(): boolean {
    return this.user.username !== "";
  }
}

export const Auth = getModule(AuthModule);
