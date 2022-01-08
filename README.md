# build-branch

Script to automate creating _built branches_.

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## Usage

Run in your Git repository from the branch you want to build:

```sh
npx build-branch
```

Run with `--dry` to see what commands would run first:
```sh
npx build-branch --dry
```

### Flags
| Flag | Description |
| - | - |
| `-c, --build-command <command>` | The command to run to build the branch. (default: "npm run build") |
| `-b, --built-branch <branch name>` | The name of the built branch. Defaults to prefixing "built/" to the current branch. |
| `-r, --remote <remote>` | The remote to push to. (default: "origin") |
| `-d, --dry` | Dry run mode |
| `-h, --help` | Show help |
| `-v, --version` | Show version |
## What's a built branch?

In projects that build from source files, a _built branch_ is a branch that contains built assets so it can be installed with [npm](https://docs.npmjs.com/cli/v8/commands/npm-install#:~:text=npm%20install%20%3Cgithubname%3E%2F%3Cgithubrepo%3E%5B%23%3Ccommit-ish%3E%5D):

```sh
npm install 'organization/repository#built-branch'
```

Built branches are useful for quickly testing changes and can be preferrable over permanently publishing a prerelease to npm.

To make a _built branch_, this script does the following:
1. Run `npm run build` (configurable)
2. Create a new branch with the `built/` namespace
2. Detects npm publish files and commits them to the new branch
4. Force pushes to remote
5. Deletes local built branch
6. Gives you the installation command

