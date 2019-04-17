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

/** Empty user */
export const EmptyUser: User = {
  oid: 0,
  username: "",
  email: "",
  full_name: "",
  disabled: false
};

export enum OperationState {
  NotStarted,
  InProgress,
  Succeeded,
  Failed
}

export class Operation {
  public state: OperationState;
  public message: string;

  constructor(
    state: OperationState = OperationState.NotStarted,
    message: string = ""
  ) {
    this.state = state;
    this.message = message;
  }

  public clear() {
    this.message = "";
    this.state = OperationState.NotStarted;
  }

  public start(message: string = "") {
    this.message = message;
    this.state = OperationState.InProgress;
  }

  public succeed(message: string = "") {
    this.message = message;
    this.state = OperationState.Succeeded;
  }

  public fail(message: string = "") {
    this.message = message;
    this.state = OperationState.Failed;
  }

  get isInProgress(): boolean {
    return this.state === OperationState.InProgress;
  }

  get isSucceeded(): boolean {
    return this.state === OperationState.Succeeded;
  }
}
