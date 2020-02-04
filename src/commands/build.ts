import { Command, flags } from '@oclif/command';
import parser from '../parser';
import { setLoggingLevel, file } from '../utils';

export default class Build extends Command {
  static description = 'Build the site at [PATH] for a production deploy to the [TARGET] specified';

  static examples = [
    '$ aerglo build',
    '$ aerglo build /path/to/site/root',
    '$ aerglo build . now',
    '$ aerglo build -p="contact.html"',
    '$ aerglo build -q="contact-list.html"',
  ];

  static flags = {
    help: flags.help({ char: 'h', description: 'show CLI help' }),
    page: flags.string({ char: 'p', description: 'incremental build of only specified pages within site root (./pages/<PAGE>)', multiple: true }),
    partial: flags.string({ char: 'q', description: 'incremental build of only specified partials within site root (./partials/<PARTIAL>)', multiple: true }),
    verbose: flags.boolean({
      char: 'v',
      description: 'noisy output with all details',
      exclusive: ['ci'],
    }),
    ci: flags.boolean({
      description: 'removes all progress indicators between stages',
      exclusive: ['verbose'],
    }),
  };

  static args = [
    {
      name: 'path',
      required: false,
      description: 'Path to root of site to build',
      hidden: false,
      parse: (input: string): string => input,
      default: '.',
    },
    {
      name: 'target',
      required: false,
      description: 'your service deploy target',
      hidden: false,
      parse: (input: string): string => input,
      default: 'netlify',
      options: ['netlify', 'now']
    }
  ];

  async run() {
    const { args, flags } = this.parse(Build);

    // Sets logging level
    if (flags.verbose) setLoggingLevel(3);

    if (args.path) {
      this.log(`you input for file: ${args.path}`);
      const document = file.open(args.path);
      if (typeof document === 'string') parser(document);
      // only seen if verbose
      if (flags.verbose) {
        this.log(`you are currently verbose`);
      }
    }
  }
}
