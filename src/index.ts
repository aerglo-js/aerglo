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


    // Thoughts -

    // 1. Parser should return Acron parse of <script context="build"></script>, if presnt
    // 2. Find AST parser for Styles, should be the same as Svelte if possible
    // 3. Parser should return "???" parse of <style></style>, if present
    // 4. Record lang or language attribute for <script context="client"></script>, if present
    //    a. typescript
    //    b. babel
    // 5. Loop through Parse5 output and identify conditionals, and other Svelte defines
    //    a. Should replace '#text' nodes that are conditionals to new types
    //    b. Identify other '#text' nodes that Svelte defines that we need as well
    // 6. Record lang or language attribute for <style></style>, if presnt
    //    a. saas
    //    b. less
    //    c. stylus
    // 7. Change "module" and "instance" to "client" and "build" scripts
    //    NOTE - Need to change from Instance and Module, to Client and Build?
    //    Marks a change from Svelte syntax, but they do different things
    //    Client would be exposed on the client itself
    //    It could support <script lang="typescript"></script>
    //    Which would allow it to be preprocessed
    //    And the output would then be bundled somehow on the client
    //    Where <script context="build"></script> would signify that
    //    it only ran on the lambda, or the CI environment
    // 8. Split out CLI commands better
    // 9. Make parser about processing a single file, compiler would handle the actual includes, props, etc
    // 10. Need to break out mechanism to loop over set of files
    // 11. Need to identify "custom components"
    // 12. Need to replace Parse5 node of custom components, with new node
    // 13. Custom components need to identify props and any special instructions for compiler
    //     a. Variable replacement "{variable}"
    //     b. JS Expression "{variable * 2}"
    //     c. Are there any props outside of passed in ones that are valid?

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

