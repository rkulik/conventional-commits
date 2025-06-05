#! /usr/bin/env node
import { createCommitCommand } from '@app/services/git.js';
import { logger } from '@app/services/logger.js';
import { configureCommit } from '@app/services/ui.js';
import clipboard from 'clipboardy';
import figlet from 'figlet';

logger.info(figlet.textSync('Conventional Commits'));

const main = async (): Promise<void> => {
  try {
    const configuredCommit = await configureCommit();

    const command = createCommitCommand(configuredCommit);
    logger.warning(`\n${command}\n`);

    clipboard.writeSync(command);
    logger.success('Commit command copied to clipboard!');
  } catch (error) {
    const isErrorInstance = error instanceof Error;
    if (isErrorInstance && error.name === 'ExitPromptError') {
      return;
    }

    logger.error('An error occurred while configuring the commit.');
  }
};

void main();
