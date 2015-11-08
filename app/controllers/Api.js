/**
 * Purely api utlities without views or partiularly attatched to area
 */
'use strict';

export default function(app) {
	const m = app.model;

	app.controller.Api = {

		School: {
			listAll: function(req, res) {
				m.School.listAll().then(function(schools) {
					let schoolMap = {};

					console.log(app.util.inspect(schools));

					schools.forEach(function(s) {
						schoolMap[s.id] = s.get('name');
					});

					res.json({
						schools: schoolMap
					});
				}, function(err) {
					res.json({
						err: err.message
					});
				});
			}

		}
	};


}