export enum OperationState {
  NotStarted,
  Confirmation,
  InProgress,
  Succeeded,
  Failed,
  Canceled
}

export class Operation {
  public state: OperationState;
  public message: string;
  public data: any;
  public response: any = [];

  constructor(
    state: OperationState = OperationState.NotStarted,
    message: string = "",
    data?: any
  ) {
    this.state = state;
    this.message = message;
    this.data = data;
  }

  public clear() {
    this.message = "";
    this.state = OperationState.NotStarted;
    this.response = [];
  }

  public startConfirmation(data?: any) {
    this.message = "";
    this.state = OperationState.Confirmation;
    this.data = data;
  }

  public start(message: string = "") {
    this.message = message;
    this.state = OperationState.InProgress;
  }

  public succeed(message: string = "") {
    this.message = message;
    this.state = OperationState.Succeeded;
    this.response = [];
  }

  public fail(message: string = "", detail?: any) {
    this.message = message;
    this.state = OperationState.Failed;
    this.response = detail;
  }

  public cancel() {
    this.state = OperationState.Canceled;
  }

  get isInProgress(): boolean {
    return this.state === OperationState.InProgress;
  }

  get isSucceeded(): boolean {
    return this.state === OperationState.Succeeded;
  }

  get isFailed(): boolean {
    return this.state === OperationState.Failed;
  }

  get isConfirmationRequired(): boolean {
    return this.state === OperationState.Confirmation;
  }

  get isStarted(): boolean {
    return this.isConfirmationRequired || this.isInProgress;
  }

  get isStartedOrFailed(): boolean {
    return this.isConfirmationRequired || this.isInProgress || this.isFailed;
  }

  get isInProgressOrCompleted(): boolean {
    return this.isInProgress || this.isSucceeded || this.isFailed;
  }
}
