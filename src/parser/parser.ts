import {
	serialize,
	parseFragment,
	DefaultTreeDocumentFragment,
	DefaultTreeElement,
	DefaultTreeNode,
} from 'parse5';
import { log } from '../utils';
import wrapInNodeFragment from './wrapInNodeFragment';
import { normalizeScript } from './languageAttributes';
import { ClientScriptRootNode, BuildScriptRootNode } from '../types/parser';

import { types } from 'util';
const parser = (document: string) => {
	const ast = parseFragment(
		document.replace(/\r?\n/g, '')
	) as DefaultTreeDocumentFragment;

	// TODO - Build Better Interface
	const css: DefaultTreeNode[] = [];

	const client: ClientScriptRootNode = {
		children: [],
	};

	const build: BuildScriptRootNode = {
		children: [],
	};

	// Split out HTML, Script (build), Script (client), CSS blocks
	const html: DefaultTreeNode[] = ast.childNodes.filter(node => {
		switch (node.nodeName) {
			case 'script':
				// Determine the context of the <script> tag within the file
				const context = (node as DefaultTreeElement).attrs.find(
					({ name }) => name === 'context'
				)?.value;

				// Identify the language attribute, and normalize it to a valid value, or false
				const language = normalizeScript(
					(node as DefaultTreeElement).attrs.find(
						({ name }) => name === 'language' || name === 'lang'
					)?.value
				);

				// Build code has to be <script context="build"></script>
				// this ensure what the intent is, and allows for additional validations
				if (context === 'build') {
					if (language)
						log.warning(
							`The language attribute is disallowed on "build" script tags.`
						);
					build.children.push(node);

					// Client is either <script></script> or <script context="client"></script>
					// this code wont be modified, except maybe preprocessing with typescript or babel
				} else if (context === 'client' || context === undefined) {
					if (language) client.language = language;
					client.children.push(node);

					// Incorrect context
				} else {
					log.error(
						'The context attribute should be "build" or "client" if it is supplied'
					);
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

	// 5. Loop through Parse5 output and identify conditionals, and other Svelte defines
	//    a. Should replace '#text' nodes that are conditionals to new types
	//    b. Identify other '#text' nodes that Svelte defines that we need as well
	// 6. Record lang or language attribute for <style></style>, if presnt
	//    a. saas
	//    b. less
	//    c. stylus
	// 8. Split out CLI commands better
	// 9. Make parser about processing a single file, compiler would handle the actual includes, props, etc
	// 10. Need to break out mechanism to loop over set of files
	// 11. Need to identify "custom components"
	// 12. Need to replace Parse5 node of custom components, with new node
	// 13. Custom components need to identify props and any special instructions for compiler
	//     a. Variable replacement "{variable}"
	//     b. JS Expression "{variable * 2}"
	//     c. Are there any props outside of passed in ones that are valid?
	//     d. What does this look like in Svelte parser? The compiler needs to have this figured out first.

	console.log('HTML (ast) - ', html);
	console.log('CSS (ast) - ', css);
	console.log('CLIENT (ast) - ', client.children);
	console.log('BUILD (ast)- ', build.children);

	console.log('HTML (serialized) - ', serialize(wrapInNodeFragment(html)));
	console.log('CSS (serialized) - ', serialize(wrapInNodeFragment(css)));
	console.log(
		'CLIENT (serialized) - ',
		serialize(wrapInNodeFragment(client.children))
	);
	console.log(
		'BUILD (serialized) - ',
		serialize(wrapInNodeFragment(build.children))
	);

	log.stage('Testing Exit Error');
	log.status('First Stage');
	log.status('Second Stage', false);
	log.status('Third Stage');
	log.info('Logging Info');
	log.debug('Logging Debug');
	log.debug({ foo: { bar: 'bar ' }, quaz: ['a', 'b', 'c'] });
	log.warning('Logging Warning');
	log.success('Logging Success');
	log.error('Logging Error without Exit');
	log.error('This should exit', true);
	log.info('Should not see this');
};

export { parser as default };
