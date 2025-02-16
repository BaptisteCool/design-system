module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018
	},
	env: {
		node: true,
		es6: true,
		browser: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	rules: {
		// Tab indent in templates
		'indent': ['off'],
		'@typescript-eslint/indent': ['error', 'tab'],

		// Return types
		'@typescript-eslint/explicit-function-return-type': ['warn', {
			'allowExpressions': true,
			'allowTypedFunctionExpressions': true
		}],

		// Force semi
		'semi': ['error', 'always'],

		// Remove space in functions, eg. function()
		'space-before-function-paren': ['error', 'never'],

		// Remove trailing coma
		'comma-dangle': ['error', 'never'],

		'space-before-blocks': ['error', 'always'],
		'keyword-spacing': ['error', { 'before': true }],

		// Single quotes
		'quotes': ['error', 'single'],

		// No trailing spaces
		'no-trailing-spaces': 'error',

		// Enforces one true brace style, eg.
		// if () {
		// }
		'brace-style': ['error', '1tbs'],

		// Limit .vue files to 330 lines
		'max-lines': ['error', {
			'max': 330,
			'skipBlankLines': true,
			'skipComments': true
		}],

		// Prefer const
		'prefer-const': 'error',

		// No var
		'no-var': 'error'
	},
	plugins: ['@typescript-eslint']
};
