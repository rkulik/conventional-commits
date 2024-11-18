import { CommitResult, Response, simpleGit } from 'simple-git';

const git = simpleGit();

export type Commit = {
  type: string;
  scope: string;
  isBreakingChange: boolean;
  description: string;
};

export const commit = (message: string): Response<CommitResult> => {
  return git.commit(message);
};

export const createCommitMessage = (commitInput: Commit): string => {
  const { type, scope, isBreakingChange, description } = commitInput;

  return scope.length
    ? `${type}(${scope})${isBreakingChange ? '!' : ''}: ${description}`
    : `${type}${isBreakingChange ? '!' : ''}: ${description}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCommit = (object: any): object is Commit => {
  const { type, scope, isBreakingChange, description } = object;

  return ![type, scope, isBreakingChange, description].includes(undefined);
};
