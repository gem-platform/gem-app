import { IUser } from "@/modules/types";
import Axios from "axios";
import { ICredentials } from "../types";

/**
 * Authentication token.
 */
export interface IAuthToken {
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
  public async login({
    username,
    password
  }: ICredentials): Promise<IAuthToken> {
    // Set form data
    const data = new FormData();
    data.set("username", username);
    data.set("password", password);

    // Return token data
    return (await Axios.post("/auth/token", data)).data as IAuthToken;
  }

  /**
   * Get authenticated user information.
   * @returns User's data.
   */
  public async me(): Promise<IUser> {
    return (await Axios.get("/auth/me")).data as IUser;
  }
}
