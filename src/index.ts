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

const wrapInNodeFragment = (nodes: DefaultTreeNode[]) => {
  return {
    nodeName: '#document',
    childNodes: nodes,
  };
}

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


    // Need to change from Instance and Module, to Client and Build?
    // Marks a change from Svelte syntax, but they do different things
    // Client would be exposed on the client itself
    // It could support <script lang="typescript"></script>
    // Which would allow it to be preprocessed
    // And the output would then be bundled somehow on the client
    // Where <script context="build"></script> would signify that
    // it only ran on the lambda, or the CI environment
    console.log('HTML (ast) - ', html);
    console.log('CSS (ast) - ', css);
    console.log('INSTANCE (ast) - ', instance);
    console.log('MODULE (ast)- ', module);

    // ast.childNodes = html;

    // const str = serialize(ast);

    console.log('HTML (serialized) - ', serialize(wrapInNodeFragment(html)));
    console.log('CSS (serialized) - ', serialize(wrapInNodeFragment(css)));
    console.log('INSTANCE (serialized) - ', serialize(wrapInNodeFragment(instance)));
    console.log('MODULE (serialized) - ', serialize(wrapInNodeFragment(module)));

  } catch (e) {
    console.log('ERROR - ', e);
  }
}

if (program.foo) {
  test();
}

if (program.bar) console.log('bar');
if (program.baz) console.log('baz');

