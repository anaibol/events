process.env['NODE_ENV'] = 'development';

var config = require('../../config/config');

var db = require('monk')(config.db);

var Pro = require('../../app/services/promoter.js');

Pro.associatePromoter(db, '712769105', '239645699564865');
Pro.associatePromoter(db, '100006997276648', '239645699564865');

Pro.associatePlayer(db, '712769105', '239645699564865');
Pro.associatePlayer(db, '100006997276648', '239645699564865');