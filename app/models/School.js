/**
 * School model
 */
'use strict';

export default function(app) {
	const PARSE_CLASSNAME = 'School';

	const Parse = app.Parse;
	const _ = app._;
	const validate = app.validate;

	class School extends Parse.Object {
		constructor(o) {
			super(PARSE_CLASSNAME);
			console.log(app.util.inspect(o));
			validate(o, _.isObject);

			this.set('name', validate(o.name, _.isString));
			this.set('shortName', validate(o.shortName, _.isString));
			this.set('primaryColor', validate(o.primaryColor, _.isString));
			this.set('secondaryColor', validate(o.secondaryColor, _.isString));
			this.set('logoLink', validate(o.logoLink, _.isString, null));
			this.set('emailDomains', validate(o.emailDomains, _.isArray));
		}

	}

	app.model.School = School;
	Parse.Object.registerSubclass(PARSE_CLASSNAME, School);
}