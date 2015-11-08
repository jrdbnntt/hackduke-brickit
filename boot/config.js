/**
 * Definition of the project-wide 'app'
 */

'use strict';

// Express Core
import http from 'http';
import express from 'express';
import session from 'express-session';
import Parse from 'parse/node';

// Utility
import moment from 'moment';
import _ from 'lodash';
import path from 'path';
import util from 'util';

// Logging
import morgan from 'morgan';

// Project utilities/core
import * as customLoader from '../lib/customLoader';
import store from '../lib/data';
import { default as validate } from '../lib/validate';

export default function configureApp() {
	const app = {};

	// Save utility references
	app.moment = moment;
	app._ = _;
	app.validate = validate;
	app.path = path;
	app.util = util;

	app.dirs = {
		pub: path.resolve(__dirname + '/../public'),
		app: path.resolve(__dirname + '/../app'),
		lib: path.resolve(__dirname + '/../lib')
	};

	// Configure Express core
	const e = app.e = express();
	app.server = http.createServer(e);

	e.locals.pretty = true;
	e.set('port', process.env.PORT || 5011);
	e.set('views', app.dirs.app + '/views');
	e.set('view engine', 'jade');

	e.use(morgan('dev'));
	e.use(express.static(app.dirs.pub));
	
	// Setup session
	e.use(session({
		name: 'connect.sid',
		secret: process.env.SECRET + 'missingSecret',
		cookie: {
			maxAge: 172800000		// 2 days
		},
		saveUninitialized: false,
		resave: false
	}));
	

	// Initialize db (Parse)
	app.Parse = Parse;
	Parse.initialize(
		process.env.PARSE_APP_ID,
		process.env.PARSE_JS_KEY,
		process.env.PARSE_MASTER_KEY
	);
	Parse.Cloud.useMasterKey();

	// Load project files
	app.store = store;

	// Pass locals to jade
	e.use(function(req, res, next) {
		res.locals.session = req.session;
		res.locals.store = app.store;
		next();
	});

	app.model = {}; // Should all be classes
	customLoader.loadAllExports(app, app.dirs.app + '/models');

	app.controller = {}; // Should all be functions
	customLoader.loadAllExports(app, app.dirs.app + '/controllers');

	return app;
}
