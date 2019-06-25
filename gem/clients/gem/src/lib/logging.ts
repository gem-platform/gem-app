interface ILogMessage {
  message: string;
}

export function log(message: ILogMessage): void {
  // tslint:disable-next-line
  console.log(message.message);
}
