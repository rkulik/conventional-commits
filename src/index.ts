#! /usr/bin/env node
import figlet from 'figlet';
import { getInput, isConfirmed } from './services/cli.js';
import { commit, createCommitMessage, isCommit } from './services/git.js';
import { logger } from './services/logger.js';

logger.info(figlet.textSync('Conventional Commits'));

(async () => {
  const input = await getInput();
  if (!isConfirmed(input) || !isCommit(input)) {
    return;
  }

  try {
    const result = await commit(createCommitMessage(input));
    if (result.commit) {
      logger.success('Commit successful!');
    } else {
      logger.warn('Commit not created!');
    }
  } catch (error) {
    logger.error('Commit failed!');
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
})();
