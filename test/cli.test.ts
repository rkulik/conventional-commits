import { getInput, isConfirmed } from '@app/services/cli.js';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { MockSTDIN, stdin as mockStdin } from 'mock-stdin';

const keyMap = {
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  escape: '\x1b',
};

const delay = (milliseconds: number): Promise<unknown> => {
  return new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

describe('cli', () => {
  let stdin: MockSTDIN;

  beforeEach(() => {
    stdin = mockStdin();
  });

  afterEach(() => {
    stdin.restore();
  });

  it('gets all inputs', async () => {
    const sendKeystrokes = async (): Promise<void> => {
      // type
      stdin.send(keyMap.down);
      stdin.send(keyMap.down);
      stdin.send(keyMap.enter);
      await delay(10);
      // scope
      stdin.send('some-scope');
      stdin.send(keyMap.enter);
      await delay(10);
      // isBreakingChange
      stdin.send('y');
      await delay(10);
      // description
      stdin.send('some description');
      stdin.send(keyMap.enter);
      await delay(10);
      // isConfirmed
      stdin.send('n');
      stdin.send(keyMap.enter);
    };

    setTimeout(sendKeystrokes, 5);

    const result = await getInput();
    expect(result).toEqual({
      type: 'ci',
      scope: 'some-scope',
      isBreakingChange: true,
      description: 'some description',
      isConfirmed: false,
    });
  });

  it('aborts the input process', async () => {
    const sendKeystrokes = async (): Promise<void> => {
      stdin.send(keyMap.escape);
    };

    setTimeout(sendKeystrokes, 5);

    const result = await getInput();
    expect(result).toEqual({});
  });

  it.each([
    { input: { isConfirmed: true }, expected: true },
    { input: { isConfirmed: false }, expected: false },
    { input: {}, expected: false },
  ])('checks the confirmed state: $input', (testCase) => {
    expect(isConfirmed(testCase.input)).toBe(testCase.expected);
  });
});
