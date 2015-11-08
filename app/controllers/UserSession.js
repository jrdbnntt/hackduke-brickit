/**
 * Paths pertaining to session managment and the handling of users
 */

'use strict';

export default function(app) {
	const m = app.model;

	app.controller.UserSession = {

		/**
		 * POST
		 * user signup submission
		 */
		signupSchool: function(req, res) {
			req.checkBody('email','Valid email required').notEmpty().isEmail();
			req.checkBody('password', 'Valid password required')
				.notEmpty().isAscii().isLength(8,50);
			req.checkBody('emailDomains').notEmpty().isArray().isSize(1);
			req.checkBody('name').notEmpty().isString();
			req.checkBody('shortName').notEmpty().isString();
			req.checkBody('primaryColor').notEmpty().isHexColor();
			req.checkBody('secondaryColor').notEmpty().isHexColor();
			req.checkBody('logoLink').optional().isURL();

			let reqErrors = req.validationErrors();
			if(reqErrors) {
				console.log(reqErrors);
				res.json({
					err: 'Invalid Usage'
				});
				return;
			}

			const b = req.body; // shortcut

			// Create & save new user objects - TODO
			console.log('success');

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