/**
 * Student model
 */
'use strict';

export default function(app) {
	const PARSE_CLASSNAME = 'Student';

	const Parse = app.Parse;
	const _ = app._;
	const validate = app.validate;

	class Student extends Parse.Object {
		constructor(o) {
			super(PARSE_CLASSNAME, o);

		}
	}

	app.model.Student = Student;
	Parse.Object.registerSubclass(PARSE_CLASSNAME, Student);
}