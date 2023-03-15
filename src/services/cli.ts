import prompts from 'prompts';
import { Commit, createCommitMessage } from './git.js';
import { colorize } from './logger.js';

type Input = Partial<Commit> & { confirmed?: boolean };

export const isConfirmed = (input: Input) => !!input.confirmed;

export const getInput = (): Promise<Input> =>
  prompts([
    {
      type: 'select',
      name: 'type',
      message: 'Type:',
      choices: [
        { title: 'feat', value: 'feat', description: 'A new feature' },
        { title: 'fix', value: 'fix', description: 'A bug fix' },
        { title: 'test', value: 'test', description: 'Adding missing tests or correcting existing tests' },
        { title: 'chore', value: 'chore', description: 'Changes to the build process' },
        { title: 'docs', value: 'docs', description: 'Documentation only changes' },
        {
          title: 'style',
          value: 'style',
          description:
            'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)',
        },
        {
          title: 'refactor',
          value: 'refactor',
          description: 'A code change that neither fixes a bug nor adds a feature',
        },
        { title: 'perf', value: 'perf', description: 'A code change that improves performance' },
      ],
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Scope (optional):',
      format: (value: string) => value.trim(),
    },
    {
      type: 'text',
      name: 'description',
      message: 'Description:',
      validate: (value: string) => !!value.trim().length,
      format: (value: string) => value.trim(),
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: (_, values) => `Use this message "${colorize(createCommitMessage(values as Commit), 'warn')}"?:`,
      initial: true,
    },
  ]);
