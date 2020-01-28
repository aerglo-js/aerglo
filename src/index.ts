#!/usr/bin/env node
import program from 'commander';
import parser from './parser';
import { setLoggingLevel, log, file } from './utils';

program
  .version('0.0.1')
  .option('-f, --file <file>', 'Process an individual page file')
  .option('-l, --log <log>', 'Logging level [1 (less) - 3 (more)] verbose, defaults to 1', '1')

program.parse(process.argv);

// Sets logging level
const level = parseInt(program.log, 10);
if (!program.log || level < 1 || level > 3) {
  log.error('Logging level must be 1, 2, or 3');
} else {
  setLoggingLevel(level);
}

// Process a single file
if (program.file) {
  const document = file.open(program.file);
  if (typeof document === 'string') parser(document);
}

