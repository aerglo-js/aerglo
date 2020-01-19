#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz');

program.parse(process.argv);

if (program.foo) console.log('foo');
if (program.bar) console.log('foo');
if (program.baz) console.log('foo');
