import { Root } from 'postcss';
import uuid from 'uuid/v5';

interface GlobalStyle {
  depth: number;
  content: string;
}

interface GlobalStyleSet {
  [key: string]: GlobalStyle;
}

const GLBOAL_STYLE_NAMESPACE = '6590d3ab-413b-4a1b-b37b-399977aa011f';

const styles: GlobalStyleSet = {};

// Adds a global stype to the site for final output
export const addGlobalStyle = (node: Root, depth: number = 0): void => {
  const content = node.toString();
  const id = uuid(content, GLBOAL_STYLE_NAMESPACE);
  const instance: GlobalStyle = { depth, content };
  styles[id] = instance;
};

