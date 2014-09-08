process.env['NODE_ENV'] = 'development';

var config = require('../../config/config');

var db = require('monk')(config.db);

var Con = require('../../app/services/construct.js');

Con.createTree(db, '327650783964916');