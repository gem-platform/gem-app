import { EmptyUser, IUser } from "@/modules/types";
import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import AuthService, { IAuthToken } from "../services/auth";
import { ICredentials } from "../types";

/** Authentication service to perform requests. */
const service = new AuthService();
const emptyToken = "";

/** Authentication storage module */
@Module({ namespaced: true, dynamic: true, name: "auth", store })
export default class AuthModule extends VuexModule {
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
    return this.user.oid !== 0;
  }

  /** Authentication token. Get from localStorage if user was previously authenticated. */
  public token: string = localStorage.getItem("token") || emptyToken;

  /** Last authentication error. */
  public message: string = "";

  /** Authenticated user data. */
  public user: IUser = { ...EmptyUser };

  /**
   * Authenticate user using specified credentials.
   * @param credentials Credentials to login with.
   * @returns true if authentication succeeded, otherwise false.
   */
  @Action public async login(credentials: ICredentials): Promise<boolean> {
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
  @Mutation public logout() {
    this.token = "";
    localStorage.removeItem("token");
  }

  /** Load authenticated user data. */
  @Action public async loadUserData() {
    try {
      const data = await service.me();
      this.userDataLoaded(data);
    } catch {
      this.authenticationRequired();
    }
  }

  /**
   * User data loaded.
   * @param user User.
   */
  @Mutation public userDataLoaded(user: IUser) {
    this.user = user;
  }

  /**
   * Authentication succeeded.
   * @param token Authentication token.
   */
  @Mutation private authenticationSucceeded(token: IAuthToken) {
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
   * Authentication required.
   */
  @Mutation private authenticationRequired() {
    this.message = "Authentication required";
  }
}

export const Auth = getModule(AuthModule);
