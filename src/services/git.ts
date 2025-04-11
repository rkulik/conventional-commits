import type { CommitResult, Response } from 'simple-git';
import { simpleGit } from 'simple-git';

const git = simpleGit();

export type Commit = {
  type: string;
  scope: string;
  isBreakingChange: boolean;
  description: string;
  body: string;
  footer: string;
};

export const commit = (message: string): Response<CommitResult> => {
  return git.commit(message);
};

export const createCommitMessage = (commit: Commit): string => {
  const { type, scope, isBreakingChange, description, body, footer } = commit;

  const emptyLine = `

`;

  const descriptionSection = `${type}${scope ? `(${scope})` : ''}${isBreakingChange ? '!' : ''}: ${description}`;
  const bodySection = body ? `${emptyLine}${body.trim()}` : '';
  const footerSection = footer ? `${emptyLine}${footer.trim()}` : '';

  return `${descriptionSection}${bodySection}${footerSection}`;
};
