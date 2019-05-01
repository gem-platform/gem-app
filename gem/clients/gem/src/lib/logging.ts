interface ILogMessage {
  message: string;
}

export function log(message: ILogMessage): void {
  console.log(message.message);
}
