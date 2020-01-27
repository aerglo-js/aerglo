import chalk from 'chalk';
import figures from 'figures';
import prettyjson from 'prettyjson';

// Level 1 = Success, Errors
// Level 2 - Success, Errors, Warnings
// Level 3 - Success, Errors, Warnings, Info, Debug
let loggingLevel = 1;

const setLoggingLevel = (level: number) => {
  loggingLevel = level;
}

const success = (msg: string) => {
  console.log(chalk.green(msg));
};

const error = (msg: string, exit: boolean = false) => {
  console.error(chalk.red(msg));
  if (exit) {
    console.info(`\n${chalk.dim.whiteBright('Aerglo exited early due to the error above.')}`);
    process.exit(1);
  }
};

const status = (msg: string, success: boolean = true) => {
  if (success) {
    console.log(chalk.green(`${figures.tick} `), chalk.white(msg));
  } else {
    console.log(chalk.red(`${figures.cross} `), chalk.white(msg));
  }
};

const stage = (msg: string) => {
  console.info(`\n${chalk.bold.keyword('orange')('// ' + msg)}`);
};

const warning = (msg: string) => {
  if (loggingLevel >= 2) {
    console.log(chalk.yellow(msg));
  }
};

const info = (msg: string) => {
  if (loggingLevel >= 3) {
    console.info(chalk.gray(msg));
  }
};

const debug = (msg: string | object) => {
  if (loggingLevel >= 3) {
    if (typeof msg === 'string') {
      console.log(chalk.magenta(msg));
    } else {
      console.log(chalk.magenta('debug content -'))
      console.log(prettyjson.render(msg));
    }
  }
};

const log = {
  error, warning, info, success, debug, stage, status
}

export { log as default, setLoggingLevel };
