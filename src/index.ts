import fs from 'fs';
import childProcess from 'child_process';
import { promisify } from 'util';
import { execa } from 'execa';
import task from 'tasuku';
import { cli } from 'cleye';
import packlist from 'npm-packlist';
import { pkgUp } from 'pkg-up';
import { version, description } from '../package.json';

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

async function getCurrentBranchName() {
	try {
		const { stdout } = await execa('git', ['symbolic-ref', '--short', '-q', 'HEAD']);
		return stdout.trim();
	} catch (error) {
		if (error instanceof Error) {
			throw new TypeError(`Failed to get current branch name\n${error.message}`);
		}

		throw error;
	}
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
		name: 'build-branch',

		version,

		flags: {
			builtBranch: {
				type: String,
				alias: 'b',
				placeholder: '<branch name>',
				description: 'The name of the built branch. Defaults to prefixing "built/" to the current branch.',
			},
			buildCommand: {
				type: String,
				alias: 'c',
				placeholder: '<command>',
				description: 'The command to run to build the branch.',
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
				description: 'Dry run mode',
			},
		},

		help: {
			description,
		},
	});

	await assertCleanTree();
	const branchFrom = await getCurrentBranchName();
	const packageJsonPath = await pkgUp();

	if (!packageJsonPath) {
		throw new Error('No package.json found');
	}

	const packageJson = await readJson(packageJsonPath);

	const {
		builtBranch = `built/${branchFrom}`,
		remote,
		dry,
	} = argv.flags;

	if (dry) {
		console.log('Running in dry mode');
	}

	const localBuiltBranch = `build-branch/${builtBranch}-${Date.now()}`;
	let success = false;
	try {
		let distributionFiles: string[] = [];

		// In the try-finally block in case it modifies the working tree
		// On failure, they will be reverted by the hard reset
		await task('Building branch', async ({ setTitle }) => {
			if (dry) {
				return;
			}

			await promisify(childProcess.exec)(argv.flags.buildCommand);

			distributionFiles = await packlist();

			if (distributionFiles.length === 0) {
				throw new Error('No distribution files found');
			}

			/**
			 * Remove "prepack" script
			 * https://github.com/npm/cli/issues/1229#issuecomment-699528830
			 *
			 * Upon installing a git dependency, the prepack script is run
			 * without devdependency installation.
			 */
			if (packageJson.scripts && 'prepack' in packageJson.scripts) {
				delete packageJson.scripts.prepack;
				await fs.promises.writeFile(packageJsonPath, stringify(packageJson, null, 2));
			}

			setTitle('Built branch');
		});

		await task(`Checking out branch ${stringify(builtBranch)}`, async ({ setTitle }) => {
			if (dry) {
				return;
			}

			await execa('git', ['checkout', '--orphan', localBuiltBranch]);

			// Unstage all files
			await execa('git', ['reset']);

			setTitle(`Checked out branch ${stringify(builtBranch)}`);
		});

		const numberOfDistributionFiles = distributionFiles.length.toLocaleString();

		await task(`Commiting ${numberOfDistributionFiles} distribution files`, async ({ setTitle }) => {
			if (dry) {
				return;
			}

			await execa('git', ['add', '-f', ...distributionFiles]);
			await execa('git', ['commit', '-nm', `Built from ${stringify(branchFrom)}`]);

			setTitle(`Commiting ${numberOfDistributionFiles} distribution files`);
		});

		await task(
			`Force pushing branch ${stringify(builtBranch)} to remote ${stringify(remote)}`,
			async ({ setTitle }) => {
				if (dry) {
					return;
				}

				await execa('git', ['push', '-f', remote, `${localBuiltBranch}:${builtBranch}`]);

				setTitle(`Force pushed branch ${stringify(builtBranch)} to remote ${stringify(remote)}`);
				success = true;
			},
		);
	} finally {
		await task(`Reverting branch to ${stringify(branchFrom)}`, async ({ setTitle }) => {
			if (dry) {
				return;
			}

			// In case commit failed and there are uncommitted changes
			await execa('git', ['reset', '--hard']);

			await execa('git', ['checkout', '-f', branchFrom]);

			// Delete local built branch
			await execa('git', ['branch', '-D', localBuiltBranch]);

			setTitle(`Reverted branch to ${stringify(branchFrom)}`);
		});
	}

	if (success) {
		await task(
			'Generating npm install command',
			async ({ setTitle, setOutput }) => {
				const { stdout } = await execa('git', ['remote', 'get-url', remote]);
				const parsedGitUrl = stdout.match(/github\.com:(.+)\.git$/);

				if (parsedGitUrl) {
					const [, repo] = parsedGitUrl;
					setTitle('Install with command:');
					setOutput(`npm i '${repo}#${builtBranch}'`);
				}
			},
		);
	}
})().catch((error) => {
	console.log('Error:', error.message);

	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
