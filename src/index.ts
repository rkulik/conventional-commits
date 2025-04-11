#! /usr/bin/env node
import { commit, createCommitMessage } from '@app/services/git.js';
import { logger } from '@app/services/logger.js';
import { configureCommit, confirmCommit } from '@app/services/ui.js';
import figlet from 'figlet';

logger.info(figlet.textSync('Conventional Commits'));

const main = async (): Promise<void> => {
  try {
    const configuredCommit = await configureCommit();
    if (!(await confirmCommit(configuredCommit))) {
      return;
    }

    const result = await commit(createCommitMessage(configuredCommit));
    if (result.commit) {
      logger.success('Commit successful!');
    } else {
      logger.warning('Commit not created!');
    }
  } catch (error) {
    const isErrorInstance = error instanceof Error;
    if (isErrorInstance && error.name === 'ExitPromptError') {
      return;
    }

    logger.error('Commit failed!');
    if (isErrorInstance) {
      logger.default(error.message);
    }
  }
};

void main();
