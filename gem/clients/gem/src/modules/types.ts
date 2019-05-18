export interface IEntity {
  oid: number;
}

/** User */
export interface IUser extends IEntity {
  oid: number;
  username: string;
  email: string;
  disabled: boolean;
}

export class User implements IUser {
  public oid: number = -1;
  public username: string = "";
  public email: string = "";
  public disabled: boolean = false;

  constructor(data: IUser) {
    this.oid = data.oid;
    this.username = data.username;
    this.email = data.email;
    this.disabled = data.disabled;
  }

  get fullName(): string {
    return this.username;
  }
}

export interface IChangePassword {
  user: IUser;
  password: string;
}

/** Empty user */
export const EmptyUser: User = new User({
  disabled: false,
  email: "",
  oid: -1,
  username: ""
});
