import { Root } from 'postcss';
import uuid from 'uuid/v5';

interface PageStyle {
  depth: number;
  content: string;
}

interface PageStyleSet {
  route: string;
  [key: string]: PageStyle | string;
}

interface PageDefinitions {
  styles: PageStyleSet
}

const PAGE_STYLE_NAMESPACE = 'c5326b1d-1a27-4145-923b-4fa139c5efaf';

const styles: PageStyleSet = { route: '' };

// Adds a page stype to the site for final output
export const addPageStyle = (node: Root, depth: number = 0): void => {
  const content = node.toString();
  const id = uuid(content, PAGE_STYLE_NAMESPACE);
  const instance: PageStyle = { depth, content };
  styles[id] = instance;
};
