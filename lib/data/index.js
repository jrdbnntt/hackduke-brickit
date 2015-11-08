/**
 * Data loader
 *
 * Loads in static data JSON from files or those manually created.
 * This data will be availble inside of the jade views.
 */
'use strict';

const store = {};


// Validators
store.customValidators = {
	email: function(email) {
		let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}
};

store.issueTypes = [
	'Social', 
	'Education',
	'Health',
	'Transportation',
	'Environment',
	'Random'
];

export default store;
