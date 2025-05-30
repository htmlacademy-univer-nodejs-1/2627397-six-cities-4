export interface Logger {
  isDebug: boolean;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, error: Error, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}
