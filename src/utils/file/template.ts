import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import mustache from 'mustache';
import log from '../log';

export default (path: string, view: any): string | void => {
	try {
		const fullpath = join(process.cwd(), path);
		const templateString = readFileSync(fullpath, 'utf-8');
		const output = mustache.render(templateString, view);
		writeFileSync(fullpath, output);
	} catch (err) {
		if (err.code === 'ENOENT') {
			log.error(`Unable to find file '${path}'.`, true);
		} else {
			log.error(err), true;
		}
	}
};
