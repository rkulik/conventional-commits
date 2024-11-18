import chalk from 'chalk';

import { checkExhaustiveness } from '../utils/check-exhaustiveness.js';

type Status = 'info' | 'success' | 'warning' | 'error';

export const colorize = (message: string, status: Status): string | undefined => {
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
  default: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
  },
  info: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(colorize(message, 'info'));
  },
  success: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(colorize(message, 'success'));
  },
  warning: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(colorize(message, 'warning'));
  },
  error: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(colorize(message, 'error'));
  },
};
