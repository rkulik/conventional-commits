import type { CommitResult, Response } from 'simple-git';
import { simpleGit } from 'simple-git';

const git = simpleGit().outputHandler((_command, stdout, stderr) => {
  stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
});

export type Commit = {
  type: string;
  scope: string;
  description: string;
  body: string;
  footer: string;
  isBreakingChange: boolean;
};

export const createCommitMessage = (commit: Commit): string => {
  const { type, scope, description, body, footer, isBreakingChange } = commit;

  const emptyLine = `

`;

  const descriptionSection = `${type}${scope ? `(${scope})` : ''}${isBreakingChange ? '!' : ''}: ${description}`;
  const bodySection = body ? `${emptyLine}${body.trim()}` : '';
  const footerSection = footer ? `${emptyLine}${footer.trim()}` : '';

  return `${descriptionSection}${bodySection}${footerSection}`;
};

export const commit = (message: string): Response<CommitResult> => {
  return git.commit(message);
};
