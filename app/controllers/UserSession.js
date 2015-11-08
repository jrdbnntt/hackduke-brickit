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
			let user = new Parse.User({
				email: b.email,
				username: b.email,
				password: b.password,
				type: 'school'
			});

			let school = new m.School({
				name: b.name,
				emailDomains: b.emailDomains,
				shortName: b.shortName,
				primaryColor: b.primaryColor,
				secondaryColor: b.secondaryColor,
				logoLink: b.logoLink
			});

			user.signUp().then(function() {				
				school.set('user', user);
				school.save().then(function() {
					res.json({});
				}, function(err) {
					res.json({
						err: 'Unable to create school. ' + err.message
					});
				});
			}, function(err) {
				res.json({
					err: 'Unable to create user. ' + err.message
				});
			});
			

		},

		signupStudent: function(req, res) {
			req.checkBody('email','Valid email required').notEmpty().isEmail();
			req.checkBody('password', 'Valid password required').notEmpty().isAscii().isLength(8,50);

			// TODO
		},


		signin: function(req, res) {
			// TODO
		},

		signout: function(req, res) {
			// TODO
		}

	};
}