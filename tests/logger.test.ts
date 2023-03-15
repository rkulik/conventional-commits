import { describe, expect, it, jest } from '@jest/globals';
import { logger } from '../src/services/logger';

type LoggerTestCase = {
  function: keyof typeof logger;
  value: string;
  expected: string;
};

const loggerTestCases: LoggerTestCase[] = [
  { function: 'info', value: 'This is an info!', expected: 'This is an info!' },
  { function: 'success', value: 'This is a success!', expected: 'This is a success!' },
  { function: 'warn', value: 'This is a warn!', expected: 'This is a warn!' },
  { function: 'error', value: 'This is an error!', expected: 'This is an error!' },
];

describe('logger', () => {
  it.each(loggerTestCases)('logs a given value: "$value"', testCase => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    logger[testCase.function](testCase.value);
    expect(consoleLogSpy).toHaveBeenCalledWith(testCase.expected);
  });
});
