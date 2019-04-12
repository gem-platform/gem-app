/** User */
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

/** Anonymous user */
export const AnonymousUser: User = {
  id: -1,
  username: "Anonymous",
  email: "anonymous@mail.com",
  full_name: "Anonymous",
  disabled: false
};
