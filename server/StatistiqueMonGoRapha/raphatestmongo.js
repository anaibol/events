global.rootDir = __dirname + '/../';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

//console.log(global.config);

var db = require('monk')(config.db);
var Events = db.get('events');

var Dateminuit = new Date();

  Dateminuit.setSeconds(0);
  Dateminuit.setMinutes(0);
  Dateminuit.setHours(0);

// Date d'aujourd'hui à minuit
console.log(Dateminuit);

Events.count({ saved: { $gt: Dateminuit }},function(e, count){
	console.log("nombre d'event importés aujourd'hui après minuit: " + count)
});

Events.count({$or: [{ start_time: { $gt: Dateminuit }}, {end_time: { $gt: Dateminuit }}]},function(e, count){
	console.log("nombre d'event live EN VIE " + count)
});

Events.count({ updated: { $gt: Dateminuit }},function(e, count){
	console.log("nombre d'event updaté aujourd'hui après minuit: " + count)
});
