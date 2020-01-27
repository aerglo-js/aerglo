import { readFileSync } from 'fs';
import { join } from 'path';
import { log } from '../../utils';

const open = (file: string) => {
  try {
    return readFileSync(join(process.cwd(), file), 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return log.error(`Unable to find file '${file}'.`);
    } else {
      return log.error(err);
    }
  }
}

export { open as default };
