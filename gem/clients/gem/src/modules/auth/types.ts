/** Authentication credentials */
export interface Credentials {
  username: string;
  password: string;
}

/** User */
export interface User {
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

/** Anonymous user */
export const AnonymousUser: User = {
  username: "Anonymous",
  email: "anonymous@mail.com",
  full_name: "Anonymous",
  disabled: false
};
