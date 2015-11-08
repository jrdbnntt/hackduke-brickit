/**
 * User model
 */
'use strict';

export default function(app) {
	const PARSE_CLASSNAME = 'User';

	const Parse = app.Parse;
	const _ = app._;
	const validate = app.validate;
	const cv = app.store.customValidators;

	class User extends Parse.User {
		constructor(o) {
			super(PARSE_CLASSNAME);

			validate(o, _.isObject);
			this.email = validate(o.email, cv.email);
			this.username = this.email;
			this.password = validate(o.password, _.isString);
		}

	}

	app.model.User = User;
	Parse.Object.registerSubclass(PARSE_CLASSNAME, User);
}