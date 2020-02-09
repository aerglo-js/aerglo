import { Command, flags } from '@oclif/command';
import validate from '../validate';

export default class Validate extends Command {
	static description =
		'Processes a Aerglo projects repo to ensure it is structured correctly, and all settings are valid.';

	async run() {
		// const { args, flags } = this.parse(Validate);

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
