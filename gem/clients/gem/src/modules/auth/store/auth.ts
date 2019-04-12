import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import AuthService, { AuthToken } from "../services/auth";
import { Credentials } from "../types";
import { AnonymousUser, User } from "@/modules/types";

/** Authentication service to perform requests. */
const service = new AuthService();
const emptyToken = "";

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "auth", store })
export default class AuthModule extends VuexModule {
  /** Authentication token. Get from localStorage if user was previously authenticated. */
  public token: string = localStorage.getItem("token") || emptyToken;

  /** Last authentication error. */
  public message: string = "";

  /** Authenticated user data. */
  public user: User = AnonymousUser;

  /**
   * Authenticate user using specified credentials.
   * @param credentials Credentials to login with.
   * @returns true if authentication succeeded, otherwise false.
   */
  @Action public async login(credentials: Credentials): Promise<boolean> {
    try {
      const token = await service.login(credentials);
      this.authenticationSucceeded(token);
      return true;
    } catch (err) {
      const message = err.response.data.detail;
      this.authenticationFailed(message || "Unknown error");
      return false;
    }
  }

  /** Logout user. */
  @Mutation logout() {
    this.token = "";
    localStorage.removeItem("token");
  }

  /** Load authenticated user data. */
  @Action public async loadUserData() {
    try {
      const data = await service.me();
      this.userDataLoaded(data);
    } catch {
      console.log("Not authorized");
    }
  }

  /**
   * Authentication succeeded.
   * @param token Authentication token.
   */
  @Mutation private authenticationSucceeded(token: AuthToken) {
    this.token = token.access_token;
    this.message = "";
    localStorage.setItem("token", token.access_token);
  }

  /**
   * Authentication failed.
   * @param message Error message.
   */
  @Mutation private authenticationFailed(message: string) {
    this.token = "";
    this.message = message;
    localStorage.removeItem("token");
  }

  /**
   * User data loaded.
   * @param user User.
   */
  @Mutation userDataLoaded(user: User) {
    this.user = user;
  }

  /**
   * Is user authenticated?
   * @returns true if authenticated, otherwise false.
   */
  get isAuthenticated(): boolean {
    return this.token !== emptyToken;
  }

  /**
   * Is user data loaded?
   * @returns true if user data loaded, otherwise false.
   */
  get isUserLoaded(): boolean {
    return this.user !== AnonymousUser;
  }
}

export const Auth = getModule(AuthModule);
