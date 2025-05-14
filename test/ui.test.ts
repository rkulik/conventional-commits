import { configureCommit, confirmCommit } from '@app/services/ui.js';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import type { MockSTDIN } from 'mock-stdin';
import { stdin as mockStdin } from 'mock-stdin';

const keyMap = {
  down: '\x1B\x5B\x42',
  enter: '\x0D',
};

const delay = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

describe('ui', () => {
  let stdin: MockSTDIN;

  beforeEach(() => {
    stdin = mockStdin();
  });

  afterEach(() => {
    stdin.restore();
  });

  it('should configure a commit', async () => {
    const sendKeystrokes = async (): Promise<void> => {
      // type
      stdin.send(keyMap.down);
      stdin.send(keyMap.down);
      stdin.send(keyMap.enter);
      await delay(10);
      // scope
      stdin.send('some scope');
      stdin.send(keyMap.enter);
      await delay(10);
      // description
      stdin.send('some description');
      stdin.send(keyMap.enter);
      await delay(10);
      // body
      stdin.send('n');
      stdin.send(keyMap.enter);
      await delay(10);
      // footer
      stdin.send('n');
      stdin.send(keyMap.enter);
      await delay(10);
      // isBreakingChange
      stdin.send('y');
      stdin.send(keyMap.enter);
    };

    setTimeout(() => {
      void sendKeystrokes();
    }, 5);

    const configuredCommit = await configureCommit();
    expect(configuredCommit).toEqual({
      type: 'ci',
      scope: 'some scope',
      description: 'some description',
      body: '',
      footer: '',
      isBreakingChange: true,
    });
  });

  it('should confirm a commit', async () => {
    const sendKeystrokes = (): void => {
      stdin.send(keyMap.enter);
    };

    setTimeout(sendKeystrokes, 5);

    expect(
      await confirmCommit({
        type: 'feat',
        scope: 'some-scope',
        description: 'some description',
        body: 'some body',
        footer: 'some footer',
        isBreakingChange: true,
      }),
    ).toBe(true);
  });

  it('should deny a commit', async () => {
    const sendKeystrokes = (): void => {
      stdin.send('n');
      stdin.send(keyMap.enter);
    };

    setTimeout(sendKeystrokes, 5);
    expect(
      await confirmCommit({
        type: 'feat',
        scope: 'some-scope',
        description: 'some description',
        body: 'some body',
        footer: 'some footer',
        isBreakingChange: true,
      }),
    ).toBe(false);
  });
});
