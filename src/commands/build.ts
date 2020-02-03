import { Command, flags } from '@oclif/command'
import parser from '../parser';
import { setLoggingLevel, file } from '../utils';

export default class Build extends Command {
  static description = 'Builds the site for product'

  static flags = {
    help: flags.help({ char: 'h' }),
    verbose: flags.boolean({ char: 'v' }),
  }

  static args = [
    {
      name: 'file',
      required: false,
      description: 'Optional glob of files to build',
      hidden: false,
      parse: (input: string): string => input,
      default: '.',
    }
  ];

  async run() {
    const { args, flags } = this.parse(Build)

    // Sets logging level
    if (flags.verbose) setLoggingLevel(3);

    if (args.file) {
      this.log(`you input for file: ${args.file}`);
      const document = file.open(args.file);
      if (typeof document === 'string') parser(document);
      // only seen if verbose
      if (flags.verbose) {
        this.log(`you are currently verbose`);
      }
    }
  }
}
