import Axios from "axios";

export default class AuthService {
  async login(login: string, password: string): Promise<string> {
    var data = new FormData();
    data.set("username", login);
    data.set("password", password);

    const res = await Axios.post("http://localhost/token", data);
    return res.data.access_token;
  }
}
