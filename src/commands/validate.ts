import { Command, flags } from '@oclif/command';
import Listr from 'listr';
import { safeLoad } from 'js-yaml';
import { Observable } from 'rxjs';
import { open, write } from '../utils/file';
import validate from '../validate';

export default class Validate extends Command {
	static description =
		'Processes a Aerglo projects repo to ensure it is structured correctly, and all settings are valid.';

	async run() {
		// const { args, flags } = this.parse(Validate);

		let data;

		const tasks = new Listr([
			{
				title: `Validating configuration file`,
				task: (ctx, task) => {
					return new Observable(observer => {
						observer.next(`Looking for 'aerglo.yml'`);
						const file = open('aerglo.yml', true);
						if (!file) {
							// TODO: Use Default Configuration
							const msg = `No 'aerglo.yml' found, using default configuration.`;
							observer.next(msg);
							task.skip(msg);
							observer.complete();
						} else {
							const errorText = [];
							try {
								// Parse YAML and Validate (replacing tabs with double spaces to avoid common indent error)
								observer.next('Parsing configuration file');
								data = safeLoad(file.replace(/\t/gi, ' '));
								if (data) {
									observer.next('Validating configuration file');
									const output = validate(data);
									if (!Array.isArray(output)) {
										if (!output.valid) {
											errorText.push(
												`Validation found 1 errors within file 'aerglo.yml'`
											);
											errorText.push(output.message);
										} else {
											this.log(`Everything looks good with 'aerglo.yml'`);
										}
									} else {
										errorText.push(
											`Validation found ${output.length} errors within file 'aerglo.yml'`
										);
										output.forEach(({ message }) => {
											errorText.push(message);
										});
									}
									if (errorText.length) {
										throw new Error();
									}
									observer.complete();
								}
							} catch (err) {
								observer.next('Failed parsing configuration file');
								write('aerglo.log', `${err}`);
								// throw new Error(
								// 	`Failed parsing configuration file. We wrote the errors to 'aerglo.log'`
								// );
								observer.complete();
							}

							if (errorText.length) {
								throw new Error(errorText.join('\n'));
							} else {
								observer.complete();
							}
						}
					});
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

		tasks.run().catch(err => {
			console.log('FOUND ERROR _ ', err);
			write('aerglo.log', `${err}`);
			this.error(
				"\nOhh no, something went wrong! We wrote the errors out to 'aerglo.log'."
			);
		});
	}
}
