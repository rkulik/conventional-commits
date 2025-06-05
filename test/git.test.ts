import type { Commit } from '@app/services/git.js';
import { createCommitCommand } from '@app/services/git.js';
import { describe, expect, it } from '@jest/globals';

const commits: Commit[] = [
  {
    type: 'feat',
    scope: '',
    description: 'some description',
    body: '',
    footer: '',
    isBreakingChange: false,
  },
  {
    type: 'feat',
    scope: 'some scope',
    description: 'some description',
    body: 'some body',
    footer: 'some footer',
    isBreakingChange: true,
  },
  {
    type: 'feat',
    scope: '    some scope    ',
    description: `     some description with special characters !@#$%^&*()"'     `,
    body: `

some body
some more body with special characters !@#$%^&*()"'
               
        `,
    footer: `

        some footer

some more footer with special characters !@#$%^&*()"'
        
        
        `,
    isBreakingChange: true,
  },
];

describe('git', () => {
  it.each([
    {
      commit: commits[0],
      expected: `git commit -m 'feat: some description'`,
    },
    {
      commit: commits[1],
      expected: `git commit -m 'feat(some scope)!: some description' \\
  -m 'some body' \\
  -m 'some footer'`,
    },
    {
      commit: commits[2],
      expected: `git commit -m "feat(some scope)\\!: some description with special characters \\!@#\\$%^&*()\\"'" \\
  -m "some body
some more body with special characters \\!@#\\$%^&*()\\"'" \\
  -m 'some footer' \\
  -m "some more footer with special characters \\!@#\\$%^&*()\\"'"`,
    },
  ])('should create a commit command: $expected', (testCase) => {
    expect(createCommitCommand(testCase.commit)).toBe(testCase.expected);
  });
});
