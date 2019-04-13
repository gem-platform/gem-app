export interface Entity {
  oid: number;
}

/** User */
export interface User extends Entity {
  oid: number;
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

/** Anonymous user */
export const AnonymousUser: User = {
  oid: -1,
  username: "Anonymous",
  email: "anonymous@mail.com",
  full_name: "Anonymous",
  disabled: false
};

/** Empty user */
export const EmptyUser: User = {
  oid: 0,
  username: "",
  email: "",
  full_name: "",
  disabled: false
};
