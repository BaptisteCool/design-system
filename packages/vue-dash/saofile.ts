import chalk, { log } from './helpers/chalk';
import cmd from './helpers/cmd';

import * as glob from 'glob';
import * as superb from 'superb';
import * as validate from 'validate-npm-package-name';

module.exports = {
	// Questions for the user
	prompts() {
		return [
			{
				name: 'name',
				message: 'Project name',
				default: '{outFolder}'
			},
			{
				name: 'description',
				message: 'Project description',
				default: `My ${superb.random()} project`
			},
			{
				name: 'author',
				type: 'string',
				message: 'Author name',
				default: '{gitUser.name}',
				store: true
			},
			{
				name: 'pm',
				message: 'Choose a package manager',
				choices: ['npm', 'yarn'],
				type: 'list',
				default: 'yarn'
			}
		];
	},
	actions() {
		const validation = validate(this.answers.name);

		if (validation.warnings) {
			validation.warnings.forEach((warning: string) => {
				console.warn('Warning:', warning)
			});
		}

		if (validation.errors) {
			validation.errors.forEach((error: string) => {
				console.error('Error:', error)
			});

			validation.errors.length && process.exit(1);
		}

		const actions: any[] = [{
			type: 'add',
			files: '**',
			templateDir: './template'
		}];

		// Move & rename static files
		actions.push({
			type: 'move',
			patterns: {
				'gitignore': '.gitignore',
				'_package.json': 'package.json',
				'_.eslintrc.js': '.eslintrc.js',
				'_.eslintignore': '.eslintignore',
				'_tsconfig.json': 'tsconfig.json'
			}
		});

		const tsPatterns: any = {};

		const files: string[] = glob.sync('./template/**/*.ejs');

		if (files) {
			// Move & rename EJS files
			// in /template, some files are prefixed with .ejs
			// to avoid linter & editor problems
			files.forEach((file) => {
				const filePath = file.replace('./template/', '');
				// Remove .ejs (4 last chars)
				const trimed = filePath.slice(0, -4);

				// Add to patterns
				tsPatterns[filePath] = trimed;
			});

			actions.push({
				type: 'move',
				patterns: tsPatterns
			});
		}

		// Modify public/index.html
		actions.push({
			type: 'modify',
			files: 'public/index.html',
			handler(data: string) {
				// Replace special match for EJS compilation by Vue CLI
				const newData = data.replace(/{BASE_URL}/g, '<%= BASE_URL %>');

				return newData;
			}
		});

		return actions;
	},
	async completed() {
		log('🗃  Initializing git repository…');
		await this.gitInit();

		log('📦  Installing dependencies…');
		await this.npmInstall({ npmClient: this.answers.pm });

		const isNewFolder = this.outDir !== process.cwd();

		const cd = () => {
			if (isNewFolder) {
				cmd(`cd ${this.outFolder}`);
			}
		}

		log();
		log(`🎉  Successfully created project ${chalk.yellow(this.answers.name)}.`);
		log('👉  Get started with the following commands:\n');
		cd();
		cmd(`${this.answers.pm} run serve`);
	}
};
