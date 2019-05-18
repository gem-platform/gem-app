export interface IEntity {
  oid: number;
}

/** User */
export interface IUser extends IEntity {
  oid: number;
  name: string;
  email: string;
  disabled: boolean;
}

export class User implements IUser {
  public oid: number = -1;
  public name: string = "";
  public email: string = "";
  public disabled: boolean = false;

  constructor(data: IUser) {
    this.oid = data.oid;
    this.name = data.name;
    this.email = data.email;
    this.disabled = data.disabled;
  }

  get fullName(): string {
    return this.name;
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
  name: "",
  oid: -1
});
