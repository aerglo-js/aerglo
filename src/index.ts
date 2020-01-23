#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join } from 'path';
import program from 'commander';
import { serialize, parseFragment, DefaultTreeDocumentFragment, DefaultTreeElement, DefaultTreeNode } from 'parse5';

program
  .version('0.0.1')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz');

program.parse(process.argv);

const test = async () => {
  try {
    const file = await fs.readFile(join(process.cwd(), 'pages/index.html'), 'utf-8');
    const ast = parseFragment(file) as DefaultTreeDocumentFragment;

    // TODO - Build Better Interface
    const css: DefaultTreeNode[] = [];
    const instance: DefaultTreeNode[] = [];
    const module: DefaultTreeNode[] = [];

    const html: DefaultTreeNode[] = ast.childNodes.filter((node) => {
      switch (node.nodeName) {
        case 'script':
          if ((node as DefaultTreeElement).attrs.find(({ name }) => name === "context")?.value === "module") {
            module.push(node);
          } else {
            instance.push(node);
          }
          return false;
        case 'style':
          css.push(node);
          return false;
        default:
          return true;
      }
    });

    console.log('HTML - ', html);
    console.log('CSS - ', css);
    console.log('INSTANCE - ', instance);
    console.log('module - ', module);

    ast.childNodes = html;

    const str = serialize(ast);

    console.log('OUTPUT - ', str);

  } catch (e) {
    console.log('ERROR - ', e);
  }
}

if (program.foo) {
  test();
}

if (program.bar) console.log('bar');
if (program.baz) console.log('baz');

