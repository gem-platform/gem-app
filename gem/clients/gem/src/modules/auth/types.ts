export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
