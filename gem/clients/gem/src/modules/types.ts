export interface IEntity {
  oid: number;
}

/** User */
export interface IUser extends IEntity {
  oid: number;
  name: string;
  email: string;
  disabled: boolean;
  role: IRole;
}

export class User implements IUser {
  public oid: number = -1;
  public name: string = "";
  public email: string = "";
  public disabled: boolean = false;
  public role: IRole = { oid: 0, name: "" };

  constructor(data: IUser) {
    this.oid = data.oid;
    this.name = data.name;
    this.email = data.email;
    this.disabled = data.disabled;
    this.role = data.role;
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
  oid: -1,
  role: {
    name: "",
    oid: 0
  }
});

export interface IRole extends IEntity {
  name: string;
}

export interface IOperationResult {
  message: string;
  data: any;
}
