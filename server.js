/**
 * Setup environment and launch
 */

'use strict';

var dotenv = require('dotenv');

dotenv.load();

require('babel/register');
require('./boot');
