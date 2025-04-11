import { createCommitMessage } from '@app/services/git.js';
import { describe, expect, it } from '@jest/globals';

describe('git', () => {
  it.each([
    {
      commit: {
        type: 'feat',
        scope: 'some-scope',
        isBreakingChange: true,
        description: 'some description',
        body: '',
        footer: '',
      },
      expected: 'feat(some-scope)!: some description',
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: true,
        description: 'some description',
        body: '',
        footer: '',
      },
      expected: 'feat!: some description',
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: false,
        description: 'some description',
        body: '',
        footer: '',
      },
      expected: 'feat: some description',
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: false,
        description: 'some description',
        body: 'some body',
        footer: '',
      },
      expected: `feat: some description

some body`,
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: false,
        description: 'some description',
        body: '',
        footer: 'some footer',
      },
      expected: `feat: some description

some footer`,
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: false,
        description: 'some description',
        body: 'some body',
        footer: 'some footer',
      },
      expected: `feat: some description

some body

some footer`,
    },
    {
      commit: {
        type: 'feat',
        scope: '',
        isBreakingChange: false,
        description: 'some description',
        body: `
some body
        
        `,
        footer: `

        some footer

some more footer
        
        
        `,
      },
      expected: `feat: some description

some body

some footer

some more footer`,
    },
  ])('should create a commit message: "$expected"', (testCase) => {
    expect(createCommitMessage(testCase.commit)).toBe(testCase.expected);
  });
});
