import { DefaultTreeNode } from 'parse5';

const wrapInNodeFragment = (nodes: DefaultTreeNode[]) => {
  return {
    nodeName: '#document',
    childNodes: nodes,
  };
}

export { wrapInNodeFragment as default };
