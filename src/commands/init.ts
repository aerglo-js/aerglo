import { Command, flags } from '@oclif/command';
import inquirer from 'inquirer';
import execa from 'execa';
import Listr from 'listr';
import { template, write } from '../utils';

interface InitResponse {
	name: string;
	description?: string;
	domain: string;
	target: 'netlify' | 'zeit' | 'amplify';
}

export default class Init extends Command {
	static description =
		'Initialize a new Aerglo project by answering a few questions';

	static examples = [
		'$ aerglo init',
		'$ aerglo init -f',
		'$ aerglo init <USER>/<REPO>',
	];

	static flags = {
		help: flags.help({ char: 'h', description: 'show CLI help' }),
		force: flags.boolean({
			char: 'f',
			description: 'use defaults for all prompts',
		}),
		verbose: flags.boolean({
			char: 'v',
			description: 'noisy output with all details',
		}),
	};

	static args = [
		{
			name: 'repo',
			description:
				'Specify an alternate GitHub template repo to initialize Aerglo',
			required: false,
			default: 'aerglo-js/base',
		},
	];

	async run() {
		const { args, flags } = this.parse(Init);

		const defaults = {
			name: 'new-website',
			description: '',
			domain: 'new-website.com',
			target: 'netlify',
		} as InitResponse;

		let responses: InitResponse = defaults;

		if (!flags.force) {
			responses = await inquirer.prompt([
				{
					name: 'name',
					message: 'What is the name of your site?',
					default: defaults.name,
					type: 'input',
				},
				{
					name: 'description',
					message: 'How do you describe your site?',
					default: defaults.description,
					type: 'input',
				},
				{
					name: 'domain',
					message: 'What domain will users go to visit your site?',
					default: defaults.domain,
					type: 'input',
				},
				{
					name: 'target',
					message: 'Which environment will you be deploying too?',
					type: 'list',
					default: defaults.target,
					choices: [
						{ name: 'Netlify', value: 'netlify' },
						{ name: 'AWS Amplify', value: 'amplify' },
						{ name: 'Zeit Now', value: 'zeit' },
					],
				},
			]);
		}

		this.log(
			`\nFor project ${responses.name}, repo being used will be ${args.repo}, your prompt was ${responses.target}.\n\n`
		);

		const tasks = new Listr([
			{
				title: 'Creating initial files',
				task: async () => {
					await execa('npx', ['degit', args.repo, '-v']);
				},
			},
			{
				title: 'Updating file structure',
				task: async () => {
					await execa('cp', ['-r', 'overrides/.', '.']);
				},
			},
			{
				title: 'Updating various files and configuration',
				task: () => {
					const files = [
						'README.md',
						'package.json',
						'package-lock.json',
						'now.json',
						'LICENSE',
						'aerglo.yml',
					];

					files.forEach(file => {
						template(file, responses);
					});
				},
			},
			{
				title: 'Removing unwanted files',
				task: async () => {
					// Remove overrides directory
					await execa('rm', ['-rf', 'overrides/']);

					// Remove netlify specific files if not netlify deploy
					if (responses.target !== 'netlify') {
						await execa('rm', ['netlify.toml']);
					}

					// Remove zeit specific files if not zeit deploy
					if (responses.target !== 'zeit') {
						await execa('rm', ['now.json']);
					}
				},
			},
		]);

		tasks.run().catch(err => {
			write('aerglo.log', `${err}`);
			this.error(
				"\nOhh no, something went wrong! We wrote the errors out to 'aerglo.log'."
			);
		});
	}
}
