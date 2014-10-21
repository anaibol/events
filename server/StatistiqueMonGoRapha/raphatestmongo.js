global.rootDir = __dirname + '/';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

//console.log(global.config);

var db = require('monk')(config.db);
var Events = db.get('events');

var Dateminuit = new Date();

  Dateminuit.setSeconds(0);
  Dateminuit.setMinutes(0);
  Dateminuit.setHours(0);
console.log(Dateminuit);

Events.count({ saved: { $gt: Dateminuit }},function(e, count){
	console.log("nombre d'event sauvés aujourd'hui après minuit: " + count)
});

//Events.count($or [{ start_date: { $gt: Dateminuit }}, { start_date: { $gt: Dateminuit }}],function(e, count){
//	console.log("nombre d'event live " + count)
//});
