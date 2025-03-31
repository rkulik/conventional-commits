import { createCommitMessage, isCommit } from '@app/services/git.js';
import { describe, expect, it } from '@jest/globals';

describe('git', () => {
  it.each([
    {
      commit: { type: 'feat', scope: 'some-scope', isBreakingChange: true, description: 'some description' },
      expected: 'feat(some-scope)!: some description',
    },
    {
      commit: { type: 'feat', scope: '', isBreakingChange: true, description: 'some description' },
      expected: 'feat!: some description',
    },
    {
      commit: { type: 'feat', scope: '', isBreakingChange: false, description: 'some description' },
      expected: 'feat: some description',
    },
  ])('creates a commit message: "$expected"', (testCase) => {
    expect(createCommitMessage(testCase.commit)).toBe(testCase.expected);
  });

  it.each([
    {
      commit: { type: 'feat', scope: 'some-scope', isBreakingChange: false, description: 'some-description' },
      expected: true,
    },
    { commit: { type: 'feat', scope: '', isBreakingChange: false, description: 'some-description' }, expected: true },
    { commit: { type: 'feat', scope: 'some-scope', isBreakingChange: false }, expected: false },
    { commit: { type: 'feat', scope: 'some-scope', description: 'some-description' }, expected: false },
    { commit: { type: 'feat', isBreakingChange: false, description: 'some-description' }, expected: false },
    { commit: { scope: 'some-scope', isBreakingChange: false, description: 'some-description' }, expected: false },
    { commit: 'not a commit', expected: false },
    { commit: 1, expected: false },
  ])('validates a commit: $commit', (testCase) => {
    expect(isCommit(testCase.commit)).toBe(testCase.expected);
  });
});
