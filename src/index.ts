#! /usr/bin/env node
import { getInput, isConfirmed } from '@app/services/cli.js';
import { commit, createCommitMessage, isCommit } from '@app/services/git.js';
import { logger } from '@app/services/logger.js';
import figlet from 'figlet';

logger.info(figlet.textSync('Conventional Commits'));

(async (): Promise<void> => {
  const input = await getInput();
  if (!isConfirmed(input) || !isCommit(input)) {
    return;
  }

  try {
    const result = await commit(createCommitMessage(input));
    if (result.commit) {
      logger.success('Commit successful!');
    } else {
      logger.warning('Commit not created!');
    }
  } catch (error) {
    logger.error('Commit failed!');
    if (error instanceof Error) {
      logger.default(error.message);
    }
  }
})();
