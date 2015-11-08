/**
 * User model
 */
'use strict';

export default function(app) {
	const PARSE_CLASSNAME = 'User';

	const Parse = app.Parse;
	const _ = app._;
	const validate = app.validate;

	class User extends Parse.User {
		constructor(o) {
			super(PARSE_CLASSNAME);

			validate(o, _.isObject);

			// TODO
		}

	}

	app.model.User = User;
	Parse.Object.registerSubclass(PARSE_CLASSNAME, User);
}