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
  public role: IRole = {oid: 0, name: ""};

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

/** Proposal */
export interface IProposal extends IEntity {
  oid: number;
  title: string;
  content: string;
  locked: boolean;
}

/** Event */
export interface IEvent extends IEntity {
  oid: number;
  title: string;
  agenda: string;
  start: Date;
  end: Date;
  proposals: number[];
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

export const EmptyProposal: IProposal = {
  content: "",
  locked: false,
  oid: -1,
  title: ""
};

export const EmptyEvent: IEvent = {
  agenda: "",
  end: new Date(),
  oid: -1,
  proposals: [],
  start: new Date(),
  title: ""
};

export interface IRole extends IEntity {
  name: string;
}

export interface IOperationResult {
  message: string;
  data: any;
}

/** Law */
export interface ILaw extends IEntity {
  oid: number;
  title: string;
  content: string;
  locked: boolean;
}

export const EmptyLaw: ILaw = {
  content: "",
  locked: false,
  oid: -1,
  title: ""
};