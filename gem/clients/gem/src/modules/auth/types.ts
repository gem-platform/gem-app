export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
