import { simpleGit } from 'simple-git';

const git = simpleGit();

export type Commit = {
  type: string;
  scope: string;
  description: string;
};

export const commit = (message: string) => git.commit(message);

export const createCommitMessage = (commitInput: Commit) => {
  const { type, scope, description } = commitInput;

  return scope.length ? `${type}(${scope}): ${description}` : `${type}: ${description}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCommit = (object: any): object is Commit => {
  const { type, scope, description } = object;

  return ![type, scope, description].includes(undefined);
};
