import fs from 'fs';
import childProcess from 'child_process';
import { promisify } from 'util';
import { execa } from 'execa';
import task from 'tasuku';
import { cli } from 'cleye';
import packlist from 'npm-packlist';
import { pkgUp } from 'pkg-up';
import { name, version, description } from '../package.json';

async function assertCleanTree() {
	const { stdout } = await execa('git', ['status', '--porcelain', '--untracked-files=no']).catch((error) => {
		if (error.stderr.includes('not a git repository')) {
			throw new Error('Not in a git repository');
		}

		throw error;
	});

	if (stdout) {
		throw new Error('Working tree is not clean');
	}
}

async function getCurrentBranchOrTagName() {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const silenceError = () => {};

	/**
	 * This commands supports older versions of Git, but since v2.22, you can do:
	 * git branch --show-current
	 */
	const branch = await execa('git', ['symbolic-ref', '--short', '-q', 'HEAD']).then(
		({ stdout }) => stdout,
		silenceError,
	);

	if (branch) {
		return branch;
	}

	const tag = await execa('git', ['describe', '--tags']).then(
		({ stdout }) => stdout,
		silenceError,
	);

	if (tag) {
		return tag;
	}

	throw new Error('Failed to get current branch name');
}

async function readJson(path: string) {
	const jsonString = await fs.promises.readFile(path, 'utf8');
	try {
		return JSON.parse(jsonString);
	} catch {
		throw new Error(`Failed to parse JSON file: ${path}`);
	}
}

const { stringify } = JSON;

(async () => {
	const argv = cli({
		name,

		version,

		flags: {
			builtBranch: {
				type: String,
				alias: 'b',
				placeholder: '<branch name>',
				description: 'The name of the built branch. Defaults to prefixing "built/" to the current branch or tag name.',
			},
			buildCommand: {
				type: String,
				alias: 'c',
				placeholder: '<command>',
				description: 'The command to build the branch.',
				default: 'npm run build',
			},
			remote: {
				type: String,
				alias: 'r',
				placeholder: '<remote>',
				description: 'The remote to push to.',
				default: 'origin',
			},
			dry: {
				type: Boolean,
				alias: 'd',
				description: 'Dry run mode. Will not build, commit, or push to the remote.',
			},
		},

		help: {
			description,
		},
	});

	await assertCleanTree();
	const branchFrom = await getCurrentBranchOrTagName();
	const packageJsonPath = await pkgUp();

	if (!packageJsonPath) {
		throw new Error('No package.json found');
	}

	const packageJson = await readJson(packageJsonPath);
	const {
		builtBranch = `built/${branchFrom}`,
		buildCommand,
		remote,
		dry,
	} = argv.flags;

	await task(
		`Building branch ${stringify(branchFrom)} → ${stringify(builtBranch)}`,
		async ({
			task, setTitle, setStatus, setOutput,
		}) => {
			if (dry) {
				setStatus('Dry run');
			}

			const localBuiltBranch = `build-this-branch/${builtBranch}-${Date.now()}`;
			let success = false;
			try {
				let publishFiles: string[] = [];

				// In the try-finally block in case it modifies the working tree
				// On failure, they will be reverted by the hard reset
				const createBuild = await task(`Creating build with ${stringify(buildCommand)}`, async ({ setWarning, setTitle }) => {
					if (!buildCommand) {
						setTitle('No build command passed in. Skipping build.');

						if (dry) {
							setWarning('');
						}
						return;
					}

					if (dry) {
						setWarning('');
						return;
					}

					await promisify(childProcess.exec)(buildCommand);
				});

				if (!dry) {
					createBuild.clear();
				}

				const getPublishFiles = await task('Getting publish files', async ({ setWarning }) => {
					if (dry) {
						setWarning('');
						return;
					}

					publishFiles = await packlist();

					if (publishFiles.length === 0) {
						throw new Error('No publish files found');
					}
				});

				if (!dry) {
					getPublishFiles.clear();
				}

				const removePrepack = await task('Removing prepack & prepare scripts', async ({ setWarning }) => {
					if (dry) {
						setWarning('');
						return;
					}

					if (!('scripts' in packageJson)) {
						return;
					}

					const { scripts } = packageJson;
					let mutated = false;

					/**
					 * Remove "prepack" script
					 * https://github.com/npm/cli/issues/1229#issuecomment-699528830
					 *
					 * Upon installing a git dependency, the prepack script is run
					 * without devdependency installation.
					 */
					if ('prepack' in scripts) {
						delete scripts.prepack;
						mutated = true;
					}

					/**
					 * npm uses "prepare" script for git dependencies
					 * because its usually unbuilt.
					 *
					 * Since build-this-branch prebuilds the package, it should
					 * be removed.
					 *
					 * https://docs.npmjs.com/cli/v8/using-npm/scripts#:~:text=NOTE%3A%20If%20a%20package%20being%20installed%20through%20git%20contains%20a%20prepare%20script%2C%20its%20dependencies%20and%20devDependencies%20will%20be%20installed%2C%20and%20the%20prepare%20script%20will%20be%20run%2C%20before%20the%20package%20is%20packaged%20and%20installed.
					 */
					if ('prepare' in scripts) {
						delete scripts.prepare;
						mutated = true;
					}

					if (mutated) {
						await fs.promises.writeFile(
							packageJsonPath,
							stringify(packageJson, null, 2),
						);
					}
				});

				if (!dry) {
					removePrepack.clear();
				}

				const checkoutBranch = await task(`Checking out branch ${stringify(builtBranch)}`, async ({ setWarning }) => {
					if (dry) {
						setWarning('');
						return;
					}

					await execa('git', ['checkout', '--orphan', localBuiltBranch]);

					// Unstage all files
					await execa('git', ['reset']);
				});

				if (!dry) {
					checkoutBranch.clear();
				}

				const commit = await task('Commiting distribution assets', async ({ setWarning }) => {
					if (dry) {
						setWarning('');
						return;
					}

					await execa('git', ['add', '-f', ...publishFiles]);
					await execa('git', ['commit', '-nm', `Built from ${stringify(branchFrom)}`]);
				});

				if (!dry) {
					commit.clear();
				}

				const push = await task(
					`Force pushing branch ${stringify(builtBranch)} to remote ${stringify(remote)}`,
					async ({ setWarning }) => {
						if (dry) {
							setWarning('');
							return;
						}

						await execa('git', ['push', '-f', remote, `${localBuiltBranch}:${builtBranch}`]);

						success = true;
					},
				);

				if (!dry) {
					push.clear();
				}
			} finally {
				const revertBranch = await task(`Switching branch back to ${stringify(branchFrom)}`, async ({ setWarning }) => {
					if (dry) {
						setWarning('');
						return;
					}

					// In case commit failed and there are uncommitted changes
					await execa('git', ['reset', '--hard']);

					await execa('git', ['checkout', '-f', branchFrom]);

					// Delete local built branch
					await execa('git', ['branch', '-D', localBuiltBranch]);
				});

				revertBranch.clear();
			}

			if (success) {
				let remoteUrl = remote;

				// If "remote" is a git remote alias, resolve it to the actual remote URL
				try {
					const { stdout } = await execa('git', ['remote', 'get-url', remoteUrl]);
					remoteUrl = stdout.trim();
				} catch {}

				const parsedGitUrl = remoteUrl.match(/github\.com:(.+)\.git$/);

				if (parsedGitUrl) {
					const [, repo] = parsedGitUrl;
					setTitle('Successfully built branch! Install with command:');
					setOutput(`npm i '${repo}#${builtBranch}'`);
				}
			}
		},
	);
})().catch((error) => {
	console.log('Error:', error.message);

	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
