/**
 * routeManagment
 * 
 * Sets up middleware to be used in routes
 *
 * Example Usage:
 * import * as r from 'routeManagement.js'
 * expressApp.get('your/GET/path', controllerFunct);
 * expressApp.post('your/POST/path', r.useJSON, controllerFunct);
 */
'use strict';

import connect from 'connect';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import _ from 'lodash';


// Parsers
export const jsonParser = bodyParser.json();
export const urlencodeParser = bodyParser.urlencoded({
		extended: false
});

// Validation/Sanitation
export const eValidator = expressValidator({
	customValidators: {
		isArray: _.isArray,
		isString: _.isString,

		// min Array size checker with optional max
		isSize: function(value, min, max) {
			return _.isArray(value) && 
				value.length >= min && 
				(max? value.length <= max : true);
		},
	},

	customSanitizers: {
		toStringArray: function(a) {
			let sArray = [];
			
			if(_.isArray(a)) {
				a.forEach(function(val) {
					if(_.isString(val)) {
						sArray.push(val);
					}
				});
			}
			
			return sArray;
		}
	}
});


// ACL setup - TODO
export const ACL = {};
// Setup ACL
// const acl = app.acl = new ACL({
// 	User:1,
// 	Hacker:2,
// 	Mentor:3,
// 	Admin:4,
// 	SuperAdmin:5
// });
// acl.setEnforce(true);
// acl.setRoles();
//
// acl.mergeRole('Hacker', 'User');
// acl.mergeRole('Mentor', 'User');
// acl.mergeRole('Admin', 'User', 'Hacker', 'Mentor');
// acl.mergeRole('SuperAdmin', 'Admin');
//
// /**
//  * ACL middleware generator
//  */
// let useACL = function(validRoles) {
// 	let aclKey = acl.genACL(validRoles);
// 	return function(req, res, next) {
// 		let roleId;
//
// 		if(req.sesssion.user) {
// 			roleId = req.sesssion.user.roleId;
// 		} else {
// 			roleId = ACL.roles.Public;
// 		}
//
// 		if(acl.check(roleId, aclKey)) {
// 			// Passed ACL
// 			next();
// 			return;
// 		}
//
// 		// Failed ACL
// 		if(req.session.user) {
// 			res.redirect('/profile?accessDenied=true');
// 		} else {
// 			res.redirect('/login?accessDenied=true');
// 		}
// 	};
// };

// Combine middleware to simplify usage
export function combine(...middleware) {
	return function(req, res, next) {
		connect.apply(
			null,
			middleware.concat(next.bind(null, null))
		).call(null, req, res);
	};
}

export const useJSON = combine(jsonParser, eValidator);

