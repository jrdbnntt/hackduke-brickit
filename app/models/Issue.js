/**
 * Issue model
 */
'use strict';

export default function(app) {
	const PARSE_CLASSNAME = 'Issue';

	const Parse = app.Parse;
	const _ = app._;
	const validate = app.validate;

	class Issue extends Parse.Object {
		constructor(o) {
			super(PARSE_CLASSNAME, o);

		}

		static queryByObjectId(objectId) {
			let query = new Parse.Query(Issue);
			return query.get(objectId);
		}
	}

	app.model.Issue = Issue;
	Parse.Object.registerSubclass(PARSE_CLASSNAME, Issue);
}