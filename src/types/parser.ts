import { DefaultTreeNode } from 'parse5';
import { Node } from 'acorn';

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
  body?: Node;
}

export interface ClientScriptRootNode {
  language?: ScriptLanguage;
  children: DefaultTreeNode[];
}

export interface StyleRootNode {
  language?: StyleLanguage;
  children: DefaultTreeNode[];
}

export interface HTMLRootNode {
  children: DefaultTreeNode[];
}
