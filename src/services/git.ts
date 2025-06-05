import { quote } from 'shell-quote';

export type Commit = {
  type: string;
  scope: string;
  description: string;
  body: string;
  footer: string;
  isBreakingChange: boolean;
};

const splitIntoLines = (text: string): string[] => {
  return text
    .split(/\n\s*\n/)
    .map((part) => {
      return part.trim();
    })
    .filter(Boolean);
};

export const createCommitCommand = (commit: Commit): string => {
  const { type, scope, description, body, footer, isBreakingChange } = commit;
  const trimmedScope = scope.trim();
  const trimmedDescription = description.trim();

  const header = `${type}${trimmedScope ? `(${trimmedScope})` : ''}${isBreakingChange ? '!' : ''}: ${trimmedDescription}`;

  const commandLines: string[][] = [
    ['git', 'commit', '-m', header],
    ...splitIntoLines(body).map((line) => {
      return ['-m', line];
    }),
    ...splitIntoLines(footer).map((line) => {
      return ['-m', line];
    }),
  ];

  return commandLines.map(quote).join(' \\\n  ');
};
