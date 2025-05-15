import { Logger } from './logger.interface.js';

export class ConsoleLogger implements Logger {
  constructor(public isDebug: boolean = false) {}

  info(message: string, ...args: unknown[]): void {
    console.log('[INFO]', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn('[WARN]', message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    console.error('[ERROR]', message, error, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDebug) {
      console.debug('[DEBUG]', message, ...args);
    }
  }
}
