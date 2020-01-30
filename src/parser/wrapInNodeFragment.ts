import { DefaultTreeNode } from 'parse5';

interface NodeFragment {
	nodeName: string;
	childNodes: DefaultTreeNode[];
}

const wrapInNodeFragment = (nodes: DefaultTreeNode[]): NodeFragment => {
	return {
		nodeName: '#document',
		childNodes: nodes,
	};
};

export { wrapInNodeFragment as default };
