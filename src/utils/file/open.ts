import { readFileSync } from 'fs';
import { join } from 'path';
import log from '../log';

export default (path: string, allowFailure: boolean = false): string | void => {
	try {
		return readFileSync(join(process.cwd(), path), 'utf-8');
	} catch (err) {
		if (err.code === 'ENOENT') {
			if (!allowFailure) {
				log.error(`Unable to find file '${path}'.`, true);
			} else {
				return;
			}
		} else {
			log.error(err, true);
		}
	}
};
