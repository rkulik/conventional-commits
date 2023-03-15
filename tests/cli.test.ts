import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { MockSTDIN, stdin as mockStdin } from 'mock-stdin';
import { getInput, isConfirmed } from '../src/services/cli.js';

const keyMap = {
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  escape: '\x1b',
};

const delay = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

describe('cli', () => {
  let stdin: MockSTDIN;

  beforeEach(() => {
    stdin = mockStdin();
  });

  afterEach(() => {
    stdin.restore();
  });

  it('gets all inputs', async () => {
    const sendKeystrokes = async () => {
      // type
      stdin.send(keyMap.down);
      stdin.send(keyMap.down);
      stdin.send(keyMap.enter);
      await delay(10);
      // scope
      stdin.send('some-scope');
      stdin.send(keyMap.enter);
      await delay(10);
      // description
      stdin.send('some description');
      stdin.send(keyMap.enter);
      await delay(10);
      // confirmed
      stdin.send('n');
      stdin.send(keyMap.enter);
    };

    setTimeout(sendKeystrokes, 5);

    const result = await getInput();
    expect(result).toEqual({
      type: 'test',
      scope: 'some-scope',
      description: 'some description',
      confirmed: false,
    });
  });

  it('aborts the input process', async () => {
    const sendKeystrokes = async () => {
      stdin.send(keyMap.escape);
    };

    setTimeout(sendKeystrokes, 5);

    const result = await getInput();
    expect(result).toEqual({});
  });

  it.each([
    { input: { confirmed: true }, expected: true },
    { input: { confirmed: false }, expected: false },
    { input: {}, expected: false },
  ])('checks the confirmed state: $input', testCase => {
    expect(isConfirmed(testCase.input)).toBe(testCase.expected);
  });
});
