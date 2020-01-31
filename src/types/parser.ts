import { DefaultTreeNode } from 'parse5';
import { Node } from 'acorn';
import { Root } from 'postcss';

export enum ScriptLanguage {
  Typescript = "typescript",
  Babel = "babel",
}

export enum StyleLanguage {
  Sass = "sass",
  Stylus = "stylus",
  Less = "less",
}

export interface BuildScriptRootNode {
  children?: Node;
}

export interface ClientScriptRootNode {
  language?: ScriptLanguage;
  children: DefaultTreeNode[];
}

export interface StyleRootNode {
  language?: StyleLanguage;
  children?: Root;
}

export interface HTMLRootNode {
  children: DefaultTreeNode[];
}
