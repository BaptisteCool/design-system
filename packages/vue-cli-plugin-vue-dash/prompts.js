const Superb = require('superb');

// Make a function, so you can call superb()
const superb = () => Superb.random();

module.exports = [
	{
		name: 'description',
		type: 'text',
		message: 'Project description',
		default: `My ${superb()} project`
	},
	{
		name: 'i18n',
		type: 'confirm',
		message: 'Use i18n (internationalization)',
		default: true
	},
	{
		name: 'vuexPersist',
		type: 'confirm',
		message: 'Use Vuex Persist',
		default: true
	}
];
