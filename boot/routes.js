/**
 * Map routes to controllers
 */

'use strict';

import * as r from '../lib/routeUtil';

export default function setRoutes(app) {
	const e = app.e;
	const c = app.controller;
	
	/**************************************************************************
	 * Public
	 * - ignores ACL
	 */

	e.get('/', c.Index.index);
	e.get('/index', c.Index.index);
	e.get('/home', c.Index.index);
	
	/**************************************************************************
	 * UserSession
	 */
	e.post('/api/signup/school', r.jsonParser, r.eValidator, c.UserSession.signupSchool);
	e.post('/api/signup/student', r.jsonParser, c.UserSession.signupStudent);
	e.post('/api/signin', r.jsonParser, c.UserSession.signin);
	e.post('/api/signout', r.jsonParser, c.UserSession.signout);

	e.post('/api/school/listAll', c.Api.School.listAll);

	/**************************************************************************
	 * Special
	 */

	e.get('*', function(req, res) {
		res.status(404);
		res.render('error', {
			title: 404,
			code: 404,
			message: 'Page "'+req.originalUrl+'" not found'
		});
	});
}
