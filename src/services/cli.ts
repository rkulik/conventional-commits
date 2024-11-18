import prompts from 'prompts';

import { Commit, createCommitMessage } from './git.js';
import { colorize } from './logger.js';

type Input = Partial<Commit> & { isConfirmed?: boolean };

export const isConfirmed = (input: Input): boolean => {
  return !!input.isConfirmed;
};

export const getInput = (): Promise<Input> => {
  return prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Type:',
      choices: [
        {
          title: 'build',
          value: 'build',
          description:
            'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
        },
        { title: 'chore', value: 'chore', description: 'Other changes that do not modify src or test files' },
        {
          title: 'ci',
          value: 'ci',
          description:
            'Changes to the CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
        },
        { title: 'docs', value: 'docs', description: 'Documentation only changes' },
        { title: 'feat', value: 'feat', description: 'A new feature' },
        { title: 'fix', value: 'fix', description: 'A bug fix' },
        { title: 'perf', value: 'perf', description: 'A code change that improves performance' },
        {
          title: 'refactor',
          value: 'refactor',
          description: 'A code change that neither fixes a bug nor adds a feature',
        },
        { title: 'revert', value: 'revert', description: 'Reverts a previous commit' },
        {
          title: 'style',
          value: 'style',
          description:
            'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)',
        },
        { title: 'test', value: 'test', description: 'Adding missing tests or correcting existing tests' },
      ],
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Scope (optional):',
      format: (value: string): string => {
        return value.trim();
      },
    },
    {
      type: 'confirm',
      name: 'isBreakingChange',
      message: 'Is this a breaking change?:',
      initial: false,
    },
    {
      type: 'text',
      name: 'description',
      message: 'Description:',
      validate: (value: string): boolean => {
        return !!value.trim().length;
      },
      format: (value: string): string => {
        return value.trim();
      },
    },
    {
      type: 'confirm',
      name: 'isConfirmed',
      message: (_, values): string => {
        return `Use this message "${colorize(createCommitMessage(values as Commit), 'warning')}"?:`;
      },
      initial: true,
    },
  ]);
};
