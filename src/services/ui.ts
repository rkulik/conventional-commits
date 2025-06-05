import { type Commit } from '@app/services/git.js';
import { confirm, editor, input, select } from '@inquirer/prompts';

export const configureCommit = async (): Promise<Commit> => {
  const type = await select({
    message: 'Type:',
    choices: [
      {
        name: 'build',
        value: 'build',
        description:
          'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
      },
      { name: 'chore', value: 'chore', description: 'Other changes that do not modify src or test files' },
      {
        name: 'ci',
        value: 'ci',
        description:
          'Changes to the CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
      },
      { name: 'docs', value: 'docs', description: 'Documentation only changes' },
      { name: 'feat', value: 'feat', description: 'A new feature' },
      { name: 'fix', value: 'fix', description: 'A bug fix' },
      { name: 'perf', value: 'perf', description: 'A code change that improves performance' },
      {
        name: 'refactor',
        value: 'refactor',
        description: 'A code change that neither fixes a bug nor adds a feature',
      },
      { name: 'revert', value: 'revert', description: 'Reverts a previous commit' },
      {
        name: 'style',
        value: 'style',
        description:
          'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)',
      },
      { name: 'test', value: 'test', description: 'Adding missing tests or correcting existing tests' },
    ],
  });

  const scope = await input({ message: 'Scope (optional):' });

  const description = await input({ message: 'Description:', required: true });

  const isBodyDesired = await confirm({ message: 'Do you want to add a body?', default: false });

  const body = isBodyDesired ? await editor({ message: 'Body', waitForUseInput: false }) : '';

  const isFooterDesired = await confirm({ message: 'Do you want to add a footer?', default: false });

  const footer = isFooterDesired ? await editor({ message: 'Footer', waitForUseInput: false }) : '';

  const isBreakingChange = await confirm({ message: 'Is this a breaking change?:', default: false });

  return { type, scope, description, body, footer, isBreakingChange };
};
