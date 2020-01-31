import {
  serialize,
  DefaultTreeElement,
  DefaultTreeNode,
} from 'parse5';
import { Node, parse } from 'acorn';
import wrapInNodeFragment from './wrapInNodeFragment';

const convertToAcorn = (node: DefaultTreeNode): Node => {
  return parse(serialize(wrapInNodeFragment((node as DefaultTreeElement).childNodes)));
};

export { convertToAcorn as default };
