import { writeFileSync } from 'fs';
import { join } from 'path';
import log from '../log';

export default (path: string, contents: string): string | void => {
	try {
		return writeFileSync(join(process.cwd(), path), contents);
	} catch (err) {
		if (err.code === 'ENOENT') {
			log.error(`Unable to find file '${path}'.`, true);
		} else {
			log.error(err), true;
		}
	}
};
