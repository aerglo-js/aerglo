import { readFileSync } from 'fs';
import { join } from 'path';
import { log } from '../../utils';

const open = (file: string) => {
  try {
    return readFileSync(join(process.cwd(), file), 'utf-8');
  } catch (e) {
    return log.error(e);
  }
}

export { open as default };
