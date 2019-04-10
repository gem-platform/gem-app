import Axios from "axios";
import { User } from "../types";

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export default class AuthService {
  /**
   * Login user using specified credentials.
   * @param username Username.
   * @param password Password.
   * @returns Access token.
   */
  async login(username: string, password: string): Promise<TokenResponse> {
    // Set form data
    var data = new FormData();
    data.set("username", username);
    data.set("password", password);

    // Return token data
    return (await Axios.post("http://localhost/token", data))
      .data as TokenResponse;
  }

  /**
   * Get authenticated user information.
   * @returns User's data.
   */
  async me(): Promise<User> {
    return (await Axios.get("http://localhost/users/me")).data as User;
  }
}
