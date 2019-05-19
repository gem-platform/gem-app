export interface IEntity {
  oid: number;
}

/** User */
export interface IUser extends IEntity {
  oid: number;
  name: string;
  email: string;
  disabled: boolean;
  role_id: number;
}

export class User implements IUser {
  public oid: number = -1;
  public name: string = "";
  public email: string = "";
  public disabled: boolean = false;
  public role_id: number = -1;

  constructor(data: IUser) {
    this.oid = data.oid;
    this.name = data.name;
    this.email = data.email;
    this.disabled = data.disabled;
    this.role_id = data.role_id;
  }

  get fullName(): string {
    return this.name;
  }
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
  oid: -1,
  role_id: -1
});

export interface IRole extends IEntity {
  name: string;
}
