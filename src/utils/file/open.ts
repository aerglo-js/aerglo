import { readFileSync } from 'fs';
import { join } from 'path';
import { log } from '../../utils';

const open = (file: string): string | void => {
	try {
		return readFileSync(join(process.cwd(), file), 'utf-8');
	} catch (err) {
		if (err.code === 'ENOENT') {
			log.error(`Unable to find file '${file}'.`, true);
		} else {
			log.error(err), true;
		}
	}
};

export { open as default };
