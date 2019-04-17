import { User } from "@/modules/types";
import Axios from "axios";
import { Credentials } from "../types";

/**
 * Authentication token.
 */
export interface AuthToken {
  access_token: string;
  token_type: string;
}

/**
 * Authentication service.
 */
export default class AuthService {
  /**
   * Login user using specified credentials.
   * @param username Username.
   * @param password Password.
   * @returns Access token.
   */
  public async login({ username, password }: Credentials): Promise<AuthToken> {
    // Set form data
    const data = new FormData();
    data.set("username", username);
    data.set("password", password);

    // Return token data
    return (await Axios.post("/auth/token", data)).data as AuthToken;
  }

  /**
   * Get authenticated user information.
   * @returns User's data.
   */
  public async me(): Promise<User> {
    return (await Axios.get("/auth/me")).data as User;
  }
}
