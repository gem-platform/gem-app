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

/** Proposal */
export interface IProposal extends IEntity {
  oid: number;
  title: string;
  content: string;
  locked: boolean;
}

export interface IChangePassword {
  user: IUser;
  password: string;
}

/** Empty user */
export const EmptyUser: IUser = {
  disabled: false,
  email: "",
  full_name: "",
  oid: -1,
  username: ""
};

export const EmptyProposal: IProposal = {
  content: "",
  locked: false,
  oid: -1,
  title: ""
};
