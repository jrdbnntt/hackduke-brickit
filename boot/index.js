/**
 * Constuct & Start server
 */

'use strict';

import configureApp from './config';
import setRoutes from './routes';

// Configure
let app = configureApp();
setRoutes(app);

// Print Environment
console.log('**** ENVIRONMENT ****');

let projEnvs = [
	'PORT',
	'PARSE_APP_ID',
	'PARSE_JS_KEY',
	'PARSE_MASTER_KEY',
	'SECRET'
];

projEnvs.forEach(function(name) {
	console.log('> '+ name + '= ' + process.env[name]);
});

console.log('---------------------');


// Start
app.server.listen(app.e.get('port'), function() {
	console.log('Listening on port ' + app.e.get('port') + '\n');
});
