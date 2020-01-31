import {
  serialize,
  DefaultTreeElement,
  DefaultTreeNode,
} from 'parse5';
import { Root, parse } from 'postcss';
import wrapInNodeFragment from './wrapInNodeFragment';

const convertToPostCss = (node: DefaultTreeNode): Root => {
  return parse(serialize(wrapInNodeFragment((node as DefaultTreeElement).childNodes)));
};

export { convertToPostCss as default };
