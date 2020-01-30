import { log } from '../utils';
import { ScriptLanguage, StyleLanguage } from '../types/parser';

// Normalizes the logic for the language attribute, to ensure valid value
const normalizeScript = (lang: string | undefined): ScriptLanguage | void => {
	// Exit if no language
	if (lang === undefined) return;

	// Normalize language
	switch (lang?.toLowerCase()) {
		case 'ts':
		case 'typescript':
			return ScriptLanguage.Typescript;
		case 'babel':
			return ScriptLanguage.Babel;
		default:
			log.warning(`Unknown language '${lang}' provided to script tag.`);
	}
};

const normalizeStyle = (lang: string | undefined): StyleLanguage | void => {
	// Exit if no language
	if (lang === undefined) return;

	// Normalize language
	switch (lang?.toLowerCase()) {
		case 'sass':
			return StyleLanguage.Sass;
		case 'less':
			return StyleLanguage.Less;
		case 'stylus':
			return StyleLanguage.Stylus;
		default:
			log.warning(`Unknown language '${lang}' provided to style tag.`);
	}
};

export { normalizeScript, normalizeStyle };
