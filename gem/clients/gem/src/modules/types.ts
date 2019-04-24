export interface IEntity {
  oid: number;
}

/** User */
export interface IUser extends IEntity {
  oid: number;
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

/** Empty user */
export const EmptyUser: IUser = {
  disabled: false,
  email: "",
  full_name: "",
  oid: 0,
  username: ""
};
