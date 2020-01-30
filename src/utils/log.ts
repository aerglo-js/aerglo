import chalk from 'chalk';
import figures from 'figures';
import prettyjson from 'prettyjson';

enum LoggingLevel {
	Critical,
	Warnings,
	Verbose,
}

// Level 1 = Status, Stage, Success, Errors
// Level 2 - Status, Stage, Success, Errors, Warnings
// Level 3 - Status, Stage, Success, Errors, Warnings, Info, Debug
let loggingLevel = 1;

const setLoggingLevel = (level: LoggingLevel): void => {
	loggingLevel = level;
};

const success = (msg: string): void => {
	console.log(chalk.green(msg));
};

const error = (msg: string, exit: boolean = false): void => {
	console.error(chalk.red(msg));
	if (exit) {
		console.info(
			`\n${chalk.dim.whiteBright(
				'Aerglo exited early due to the error above.'
			)}`
		);
		process.exit(1);
	}
};

const status = (msg: string, success: boolean = true): void => {
	if (success) {
		console.log(chalk.green(`${figures.tick} `), chalk.white(msg));
	} else {
		console.log(chalk.red(`${figures.cross} `), chalk.white(msg));
	}
};

const stage = (msg: string): void => {
	console.info(`\n${chalk.bold.keyword('orange')('// ' + msg)}`);
};

const warning = (msg: string): void => {
	if (loggingLevel >= 2) {
		console.log(chalk.yellow(msg));
	}
};

const info = (msg: string): void => {
	if (loggingLevel >= 3) {
		console.info(chalk.gray(msg));
	}
};

const debug = (msg: string | object): void => {
	if (loggingLevel >= 3) {
		if (typeof msg === 'string') {
			console.log(chalk.magenta(msg));
		} else {
			console.log(chalk.magenta('debug content -'));
			console.log(prettyjson.render(msg));
		}
	}
};

const log = {
	error,
	warning,
	info,
	success,
	debug,
	stage,
	status,
};

export { log as default, setLoggingLevel };
