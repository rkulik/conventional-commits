import chalk from 'chalk';
import { checkExhaustiveness } from '../utils/check-exhaustiveness.js';

type Status = 'info' | 'success' | 'warning' | 'error';

export const colorize = (message: string, status: Status) => {
  switch (status) {
    case 'info':
      return chalk.blue(message);
    case 'success':
      return chalk.green(message);
    case 'warning':
      return chalk.yellow(message);
    case 'error':
      return chalk.red(message);
    default:
      checkExhaustiveness(status);
  }
};

export const logger = {
  default: (message: string) => console.log(message),
  info: (message: string) => console.log(colorize(message, 'info')),
  success: (message: string) => console.log(colorize(message, 'success')),
  warning: (message: string) => console.log(colorize(message, 'warning')),
  error: (message: string) => console.log(colorize(message, 'error')),
};
