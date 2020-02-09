import { readFileSync } from 'fs';
import { join } from 'path';
import log from '../log';

export default (path: string): string | void => {
	try {
		return readFileSync(join(process.cwd(), path), 'utf-8');
	} catch (err) {
		if (err.code === 'ENOENT') {
			log.error(`Unable to find file '${path}'.`, true);
		} else {
			log.error(err, true);
		}
	}
};
