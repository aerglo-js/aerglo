import { DefaultTreeNode } from 'parse5';

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
  children: DefaultTreeNode[];
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
