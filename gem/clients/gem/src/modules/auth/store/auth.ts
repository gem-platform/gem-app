import { EmptyUser, IUser } from "@/modules/types";
import { Operation } from "@/lib/operations";
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
  /** List of async operations. */
  public operations = {
    login: new Operation()
  };

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
    return this.user.oid !== -1;
  }

  /** Authentication token. Get from localStorage if user was previously authenticated. */
  public token: string = localStorage.getItem("token") || emptyToken;

  // /** Last authentication error. */
  // public message: string = "";

  // /** Error details */
  // public details: any = {};

  /** Authenticated user data. */
  public user: IUser = { ...EmptyUser };

  /**
   * Authenticate user using specified credentials.
   * @param credentials Credentials to login with.
   * @returns true if authentication succeeded, otherwise false.
   */
  @Action public async login(credentials: ICredentials): Promise<boolean> {
    try {
      this.authenticationStarted();
      const token = await service.login(credentials);
      this.authenticationSucceeded(token);
      return true;
    } catch (err) {
      if (!err.response) {
        // there is no connection to the backed. it may be down
        this.authenticationFailed({ message: "server.offline" });
      } else if (err.response.status === 422) {
        // validation failed. unprocessable form
        this.authenticationFailed({
          message: "form.invalid",
          details: err.response.data.detail
        });
      } else {
        const message = err.response.data.detail;
        this.authenticationFailed({
          message: message || "Unknown error",
          details: []
        });
      }
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

  @Mutation private authenticationStarted() {
    this.operations.login.start();
  }

  /**
   * Authentication succeeded.
   * @param token Authentication token.
   */
  @Mutation private authenticationSucceeded(token: IAuthToken) {
    this.token = token.access_token;
    this.operations.login.succeed();
    localStorage.setItem("token", token.access_token);
  }

  /**
   * Authentication failed.
   * @param message Error message.
   */
  @Mutation private authenticationFailed({ message, details = {} }) {
    this.token = "";
    this.operations.login.fail(message, details);
    localStorage.removeItem("token");
  }

  /**
   * Authentication required.
   */
  @Mutation private authenticationRequired() {
    // this.message = "Authentication required";
  }

  /**
   * Set auth token.
   * @param token Token to set.
   */
  @Mutation public setToken(token: string) {
    this.token = token;
  }
}

export const Auth = getModule(AuthModule);
