# @aerglo-js/aerglo

Static Site generator for the JAMstack

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@aerglo-js/aerglo.svg)](https://npmjs.org/package/@aerglo-js/aerglo)
[![CircleCI](https://circleci.com/gh/aerglo-js/aerglo/tree/master.svg?style=shield)](https://circleci.com/gh/aerglo-js/aerglo/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/aerglo-js/aerglo?branch=master&svg=true)](https://ci.appveyor.com/project/aerglo-js/aerglo/branch/master)
[![Codecov](https://codecov.io/gh/aerglo-js/aerglo/branch/master/graph/badge.svg)](https://codecov.io/gh/aerglo-js/aerglo)
[![Downloads/week](https://img.shields.io/npm/dw/@aerglo-js/aerglo.svg)](https://npmjs.org/package/@aerglo-js/aerglo)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License](https://img.shields.io/npm/l/@aerglo-js/aerglo.svg)](https://github.com/aerglo-js/aerglo/blob/master/package.json)

<!-- toc -->
* [@aerglo-js/aerglo](#aerglo-jsaerglo)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @aerglo-js/aerglo
$ aerglo COMMAND
running command...
$ aerglo (-v|--version|version)
@aerglo-js/aerglo/0.0.2 darwin-x64 node-v10.15.3
$ aerglo --help [COMMAND]
USAGE
  $ aerglo COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`aerglo build [PATH] [TARGET]`](#aerglo-build-path-target)
* [`aerglo dev [FILE]`](#aerglo-dev-file)
* [`aerglo hello [FILE]`](#aerglo-hello-file)
* [`aerglo help [COMMAND]`](#aerglo-help-command)
* [`aerglo init [REPO]`](#aerglo-init-repo)
* [`aerglo validate [FILE]`](#aerglo-validate-file)

## `aerglo build [PATH] [TARGET]`

Build the site at [PATH] for a production deploy to the [TARGET] specified

```
USAGE
  $ aerglo build [PATH] [TARGET]

ARGUMENTS
  PATH    [default: .] Path to root of site to build
  TARGET  (netlify|now) [default: netlify] your service deploy target

OPTIONS
  -h, --help             show CLI help
  -p, --page=page        incremental build of only specified pages within site root (./pages/<PAGE>)
  -q, --partial=partial  incremental build of only specified partials within site root (./partials/<PARTIAL>)
  -v, --verbose          noisy output with all details
  --ci                   removes all progress indicators between stages

EXAMPLES
  $ aerglo build
  $ aerglo build /path/to/site/root
  $ aerglo build . now
  $ aerglo build -p="contact.html"
  $ aerglo build -q="contact-list.html"
```

_See code: [src/commands/build.ts](https://github.com/aerglo-js/aerglo/blob/v0.0.2/src/commands/build.ts)_

## `aerglo dev [FILE]`

describe the command here

```
USAGE
  $ aerglo dev [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/dev.ts](https://github.com/aerglo-js/aerglo/blob/v0.0.2/src/commands/dev.ts)_

## `aerglo hello [FILE]`

describe the command here

```
USAGE
  $ aerglo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ aerglo hello
       hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/aerglo-js/aerglo/blob/v0.0.2/src/commands/hello.ts)_

## `aerglo help [COMMAND]`

display help for aerglo

```
USAGE
  $ aerglo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `aerglo init [REPO]`

Initialize a new Aerglo project by answering a few questions

```
USAGE
  $ aerglo init [REPO]

ARGUMENTS
  REPO  [default: aerglo-js/base] Specify an alternate GitHub template repo to initialize Aerglo

OPTIONS
  -f, --force    use defaults for all prompts
  -h, --help     show CLI help
  -v, --verbose  noisy output with all details

EXAMPLES
  $ aerglo init
  $ aerglo init -f
  $ aerglo init <USER>/<REPO>
```

_See code: [src/commands/init.ts](https://github.com/aerglo-js/aerglo/blob/v0.0.2/src/commands/init.ts)_

## `aerglo validate [FILE]`

describe the command here

```
USAGE
  $ aerglo validate [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/validate.ts](https://github.com/aerglo-js/aerglo/blob/v0.0.2/src/commands/validate.ts)_
<!-- commandsstop -->
