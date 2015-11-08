/**
 * Paths pertaining to session managment and the handling of users
 */

'use strict';

export default function(app) {
	const m = app.model;
	const Parse = app.Parse;

	app.controller.UserSession = {

		/**
		 * POST
		 * user signup submission
		 */
		signupSchool: function(req, res) {
			const b = req.body; // shortcut

			req.checkBody('email','Valid email required').notEmpty().isEmail();
			req.checkBody('password', 'Valid password required')
				.notEmpty().isAscii().isLength(8,50);
			req.checkBody('name').notEmpty().isString();
			req.checkBody('emailDomains').notEmpty().isArray().isSize(1);
			req.checkBody('shortName').notEmpty().isString();
			req.checkBody('primaryColor').notEmpty().isHexColor();
			req.checkBody('secondaryColor').notEmpty().isHexColor();
			req.checkBody('logoLink').optional().isURL();

			req.sanitize('emailDomains').toStringArray();

			let reqErrors = req.validationErrors();
			if(reqErrors) {
				console.log(reqErrors);
				res.json({
					err: 'Invalid Usage'
				});
				return;
			}

			if(!b.emailDomains.length) {
				res.json({
					err: 'Invalid usage'
				});
			}
			
			// Create & save new user + school objects - TODO
			

			let school = new m.School({
				name: b.name,
				emailDomains: b.emailDomains,
				shortName: b.shortName,
				primaryColor: b.primaryColor,
				secondaryColor: b.secondaryColor,
				logoLink: b.logoLink
			});

			school.save().then(function(schoolObj) {
				let user = new Parse.User({
					email: b.email,
					username: b.email,
					password: b.password,
					school: schoolObj,
					role: 'admin'
				});

				user.signUp().then(function() {				
					res.json({});
				}, function(err) {
					res.json({
						err: 'Unable to create user. ' + err.message
					});
				});
			}, function(err) {
				res.json({
					err: 'Unable to create school. ' + err.message
				});
			});

		},

		signupStudent: function(req, res) {
			const b = req.body;

			if(!b.email ||
				!b.password ||
				!b.schoolId) {
				res.json({
					err: 'Invalid usage'
				});
				return;
			}
			
			// Get the school obj
			m.School.queryByObjectId(b.schoolId).then(function(schoolObj) {
				
				let user = new Parse.User({
					email: b.email,
					username: b.email,
					password: b.password,
					school: schoolObj,
					role: 'student'
				});

				user.signUp().then(function() {				
					res.json({});
				}, function(err) {
					res.json({
						err: 'Unable to create user. ' + err.message
					});
				});

			}, function(err) {
				res.json({
					err: err.message
				});
			});

		},


		signin: function(req, res) {
			const b = req.body;

			if(!b.email ||
				!b.password) {
				res.json({
					err: 'Missing Credentials'
				});
				return;
			}

			Parse.User.logIn(b.email, b.password).then(function(user) {
				
			}, function(err) {
				req.json({
					err: err.message
				});
			});
		},

		signout: function(req, res) {
			// TODO
		}

	};
}