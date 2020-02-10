import { Command, flags } from '@oclif/command';
import Listr from 'listr';
import validate from '../validate';
import { write } from '../utils';

export default class Validate extends Command {
	static description =
		'Processes a Aerglo projects repo to ensure it is structured correctly, and all settings are valid.';

	async run() {
		// const { args, flags } = this.parse(Validate);

		const tasks = new Listr([
			{
				title: `Validating configuration file`,
				task: (ctx, task) => {
					if (false) {
						task.skip(`No 'aerglo.yml' found, using default configuration.`);
					}
				},
			},
			{
				title: `Validating folder paths`,
				task: () => {},
			},
			{
				title: `Validating file paths`,
				task: () => {},
			},
		]);

		const output = validate();

		if (!Array.isArray(output)) {
			if (!output.valid) {
				this.error(`Error: ${output.message}`);
			} else {
				this.log(`Everything looks good with 'aerglo.yml'`);
			}
		} else {
			output.forEach(({ message }) => {
				this.log(`Error: ${message}`);
			});

			this.error(
				`Validation found ${output.length} errors within file 'aerglo.yml'`
			);
		}
	}
}
